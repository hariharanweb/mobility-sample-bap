import Api from '../api/Api';
import Cache from '../utilities/Cache';
import LoggingService from './LoggingService';

const REGISTRY_URL = `${process.env.REGISTRY_URL}/lookup`;
const logger = LoggingService.getLogger('LookUpService');

const lookUpPublicKey = async (type) => {
  const request = JSON.stringify({
    type,
  });
  const response = await Api.doPost(REGISTRY_URL, request);
  const responseJson = await response.json();
  logger.debug(`the looked up publickey is: ${responseJson[0].signing_public_key}`);
  return responseJson[0].signing_public_key;
};

const getPublicKey = async (type) => {
  const cachekey = `publicKey - ${type};`;
  const publicKey = await Cache.getCache(cachekey);
  if (publicKey) {
    logger.debug(`the public key is: ${publicKey}`);
    return publicKey;
  }
  const pulicKeyFromLookUp = await lookUpPublicKey(type);
  Cache.setCache(cachekey, pulicKeyFromLookUp, 200000);
  logger.debug(`the public key is: ${pulicKeyFromLookUp}`);
  return pulicKeyFromLookUp;
};

export default {
  getPublicKey,
};
