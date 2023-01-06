// import NodeCache from 'node-cache';
import Cache from '../utilities/Cache';

// const cache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const storeResult = async (response) => {
  const messageId = response.context.message_id;
  const result = await Cache.getCache(messageId);
  if (result) {
    result.push(response);
    Cache.setCache(messageId, result);
  } else {
    Cache.setCache(messageId, [response]);
    // cache.set(messageId, [response]);
  }
};

const getResult = (messageId) => Cache.getCache(messageId); // cache.get(messageId);

export default {
  storeResult,
  getResult,
};
