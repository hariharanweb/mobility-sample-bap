import LoggingService from '../../services/LoggingService';
import SignatureHelper from './SignatureHelper';

const generateAuthorizationHeaderValue = async (body, privateKey) => {
  const logger = LoggingService.getLogger('AuthHeader');
  const createdAndExpiresValue = SignatureHelper.getCreatedAndExpires();
  const signature = await SignatureHelper.createSignature(body, createdAndExpiresValue, privateKey);
  const header = `Signature keyId="1001|UUID|ed25519",algorithm="ed25519",created="${createdAndExpiresValue[0]}",expires="${createdAndExpiresValue[1]}",headers="(created) (expires) digest",signature="${signature}"`;
  logger.debug(`Header value ${header}`);
  return header;
};

export default {
  generateAuthorizationHeaderValue,
};
