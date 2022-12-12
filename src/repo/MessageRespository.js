import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const storeResult = (response) => {
  const messageId = response.context.message_id;
  const result = cache.get(messageId);
  if (result) {
    result.push(response);
    cache.set(messageId, result);
  } else {
    cache.set(messageId, [response]);
  }
};

const getResult = (messageId) => cache.get(messageId);

export default {
  storeResult,
  getResult,
};
