import sodium from 'libsodium-wrappers';
import fetch from 'node-fetch';
import LoggingService from '../services/LoggingService';
import Api from '../api/Api';

const logger = LoggingService.getLogger();

const getSignature = (headers) => {
  const signaturePart = split_auth_header(
    `${headers['x-gateway-authorization']}`,
  );
  return signaturePart.signature;
};

const getCreated = (headers) => {
  const signaturePart = split_auth_header(
    headers['x-gateway-authorization'],
  );
  return signaturePart.created;
};

const getExpires = (headers) => {
  const signaturePart = split_auth_header(
    headers['x-gateway-authorization'],
  );
  return signaturePart.expires;
};

const verify = (msg, publicKey, signature) => {
  const verification = sodium.crypto_sign_verify_detached(
    sodium.from_base64(signature, sodium.base64_variants.ORIGINAL),
    msg,
    sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL),
  );
  return verification;
};

const getPublicKey = async (typeValue) => {
  const raw = JSON.stringify({
    type: typeValue,
  });

  const response = await Api.doPost(`${process.env.GATEWAY_URL}/lookup`, raw);
  const responseJson = await response.json();
  return responseJson[0].signing_public_key;
};

const createSigningString = async (body, created, expires) => {
  await sodium.ready;
  const digest = sodium.crypto_generichash(64, sodium.from_string(JSON.stringify(body)));
  const digestBase64 = sodium.to_base64(
    digest,
    sodium.base64_variants.ORIGINAL,
  );
  const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digestBase64}`;
  return signingString;
};

const authorize = async (req,keyType) => {
  try {
    logger.debug(`The request header is ${JSON.stringify(req.headers)}`);
    const signature = getSignature(req.headers);
    const created = getCreated(req.headers);
    const expires = getExpires(req.headers);
    if (typeof signature === 'undefined') {
      logger.error('Empty Signature in Header from BAP');
      // eslint-disable-next-line no-throw-literal
      throw 'Signature Field is Empty';
    }
    const publicKey = await getPublicKey(keyType);
    const signingString = await createSigningString(
      req.body,
      created.toString(),
      expires.toString(),
    );
    const verification = verify(signingString, publicKey, signature);
    if (verification) {
      return verification;
    }
    // eslint-disable-next-line no-throw-literal
    throw 'Verification Failed';
  } catch (err) {
    logger.error(`Error Triggered: ${err}`);
    throw err;
  }
};

const split_auth_header = (auth_header) => {
  const header = auth_header.replace('Signature ', '');
  const re = /\s*([^=]+)=([^,]+)[,]?/g;
  let m;
  const parts = {};
  while ((m = re.exec(header)) !== null) {
    if (m) {
      parts[m[1]] = remove_quotes(m[2]);
    }
  }
  return parts;
};
const remove_quotes = (value) => {
  if (value.length >= 2
    && value.charAt(0) == '"'
    && value.charAt(value.length - 1) == '"') {
    value = value.substring(1, value.length - 1);
  }
  return value;
};

export default {
  authorize,
};
