import * as dotenv from 'dotenv';
import Api from '../api/Api';
import MessageRespository from '../repo/MessageRespository';
import ContextBuilder from '../utilities/ContextBuilder';
import LoggingService from './LoggingService';

dotenv.config();

const search = async (message) => {
  const logger = LoggingService.getLogger('SearchService');
  logger.debug(`Search called with ${JSON.stringify(message)}`);
  const context = ContextBuilder.getContext('search');

  const url = `${process.env.GATEWAY_URL}/search`;
  const searchRequest = {
    context,
    message,
  };

  const response = await Api.doPost(url, JSON.stringify(searchRequest));

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
