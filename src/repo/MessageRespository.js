import MongoRepository from './MongoRepository';
import Cache from '../utilities/Cache';

const {
  DB_COLLECTION_NAME, DB_NAME, DB_URL, USE_MONGO,
} = process.env;

const storeResult = async (response) => {
  if (USE_MONGO) {
    const repo = await MongoRepository.getInstance(DB_URL, DB_NAME, DB_COLLECTION_NAME);
    await repo.store(response);
  } else {
    const messageId = response.context.message_id;
    const result = await Cache.getCache(messageId);
    if (result) {
      result.push(response);
      Cache.setCache(messageId, result);
    } else {
      Cache.setCache(messageId, [response]);
    }
  }
};

const getResult = async (messageId) => {
  if (USE_MONGO) {
    const repo = await MongoRepository.getInstance(DB_URL, DB_NAME, DB_COLLECTION_NAME);
    return repo.findByMessageId(messageId);
  }
  return Cache.getCache(messageId);
};

export default {
  storeResult,
  getResult,
};
