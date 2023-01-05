import Api from "../api/Api";
import Cache from "../utilities/Cache";

const REGISTRY_URL = `${process.env.REGISTRY_URL}/lookup`;


const getPublicKey = async (ukId) => {
  const cachekey = `publicKey - ${ukId};`;
  const publicKey = await Cache.getCache(cachekey);
  if (publicKey) {
    console.log("The cached publicKey is:" + publicKey);
    return publicKey;
  }
  return lookUpPublicKey(cachekey, ukId);
};

const lookUpPublicKey = async (cachekey, ukId) => {
  const request = JSON.stringify({
    ukId: ukId,
  });
  console.log("The request is" + request);
  const response = await Api.doPost(REGISTRY_URL, request);
  const responseJson = await response.json();
  Cache.setCache(cachekey, responseJson[0].signing_public_key);
  console.log(
    "the looked up public cachekey is: " + cachekey,
    responseJson[0].signing_public_key
  );
  return responseJson[0].signing_public_key;
};

export default {
  getPublicKey,
};
