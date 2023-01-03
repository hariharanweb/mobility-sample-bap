import sodium from 'libsodium-wrappers';

const getCreatedAndExpires = () => {
  const created = Math.floor(
    new Date().getTime() / 1000 - 1 * 60,
  ).toString();
  const expires = (
    parseInt(created, 10) + 1 * 60 * 60).toString();
  return [created, expires];
};

const createSignature = async (body, createdAndExpiresValue) => {
  await sodium.ready;
  const digest = sodium.crypto_generichash(64, sodium.from_string(body));
  const digestBase64 = sodium.to_base64(digest, sodium.base64_variants.ORIGINAL);
  const signingString = `(created): ${createdAndExpiresValue[0]}
  (expires): ${createdAndExpiresValue[1]}
  digest: BLAKE-512=${digestBase64}`;
  console.log( `Digest Base 64: ${digestBase64}`);
  console.log(`Signing String : ${signingString}`);
  const privateKey = `${process.env.privateKey}`;
  const signedMessage = sodium.crypto_sign_detached(
    signingString,
    sodium.from_base64(privateKey, sodium.base64_variants.ORIGINAL),
  );
  return sodium.to_base64(signedMessage, sodium.base64_variants.ORIGINAL);
};

const createAuthorizationHeader = (signature, createdAndExpiresValue) => {
  const header = `Signature keyId="1001|UUID|ed25519",algorithm="ed25519",created="${createdAndExpiresValue[0]}",expires="${createdAndExpiresValue[1]}",headers="(created) (expires) digest",signature="${signature}"`;
  return header;
};

export default {
  createAuthorizationHeader,
  createSignature,
  getCreatedAndExpires,
};
