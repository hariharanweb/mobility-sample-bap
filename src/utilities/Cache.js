import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 200000, checkperiod: 200000 });

const getCache = (cachekey) => {
    console.log("Inside get chache");
    return cache.get(cachekey);
  };

const setCache = (cachekey, publicKey) => {
    console.log("Set cache");
    cache.set(cachekey, publicKey);
};

export default {
    getCache,
    setCache
}