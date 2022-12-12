import * as dotenv from 'dotenv';
import log4js from 'log4js';
import Api from '../api/Api';
import MessageRespository from '../repo/MessageRespository';
import ContextBuilder from '../utilities/ContextBuilder';

dotenv.config();

const search = async (message) => {
  const logger = log4js.getLogger('SearchService');
  const context = ContextBuilder.getContext('search');
  const searchRequest = {
    context,
    message,
  };
  const url = `${process.env.GATEWAY_URL}/search`;
  const response = await Api.doPost(url, searchRequest);
  const responseText = await response.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

const storeSearchResult = (response) => {
  MessageRespository.storeResult(response);
};

const getSearchResult = (messageId) => MessageRespository.getResult(messageId);

export default {
  search,
  getSearchResult,
  storeSearchResult,
};
