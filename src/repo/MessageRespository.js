import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const storeResult = (response) => {
  cache.set(response.context.message_id, response);
};

const getResult = (messageId) => cache.get(messageId);

export default {
  storeResult,
  getResult,
};
