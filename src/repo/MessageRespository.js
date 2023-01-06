import Cache from '../utilities/Cache';

const storeResult = async (response) => {
  const messageId = response.context.message_id;
  const result = await Cache.getCache(messageId);
  if (result) {
    result.push(response);
    Cache.setCache(messageId, result);
  } else {
    Cache.setCache(messageId, [response]);
  }
};

const getResult = (messageId) => Cache.getCache(messageId);

export default {
  storeResult,
  getResult,
};
