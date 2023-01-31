import Api from '../api/Api';
import Cache from '../utilities/Cache';
import LoggingService from './LoggingService';

const REGISTRY_URL = `${process.env.REGISTRY_URL}/lookup`;
const logger = LoggingService.getLogger('LookUpService');

const lookUpPublicKey = async (request) => {
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
  const requestForLookUpWithType = JSON.stringify({
    type,
  });
  const pulicKeyFromLookUp = await lookUpPublicKey(requestForLookUpWithType);
  Cache.setCache(cachekey, pulicKeyFromLookUp, 200000);
  logger.debug(`the public key is: ${pulicKeyFromLookUp}`);
  return pulicKeyFromLookUp;
};

const getPublicKeyWithUkId = async (ukId) => {
  const cachekey = `publicKey - ${ukId};`;
  const publicKey = await Cache.getCache(cachekey);
  if (publicKey) {
    logger.debug(`the public key is: ${publicKey}`);
    return publicKey;
  }
  const requestForLookUpWithUkId = JSON.stringify({
    ukId,
  });

  const pulicKeyFromLookUp = await lookUpPublicKey(requestForLookUpWithUkId);
  Cache.setCache(cachekey, pulicKeyFromLookUp, 200000);
  logger.debug(`the public key is: ${pulicKeyFromLookUp}`);
  return pulicKeyFromLookUp;
};

const getPublicKeyWithSubscriberId = async (subscriberId) => {
  const cachekey = `publicKey - ${subscriberId};`;
  const publicKey = await Cache.getCache(cachekey);
  if (publicKey) {
    return publicKey;
  }
  const requestForLookUpWithSubscriberId = JSON.stringify({
    subscriber_id: subscriberId,
  });

  const publicKeyFromLookUp = await lookUpPublicKey(requestForLookUpWithSubscriberId);
  Cache.setCache(cachekey, publicKeyFromLookUp, 200000);
  logger.debug(`the public key is: ${publicKeyFromLookUp}`);
  return publicKeyFromLookUp;
};

export default {
  getPublicKey,
  getPublicKeyWithUkId,
  getPublicKeyWithSubscriberId,
};
