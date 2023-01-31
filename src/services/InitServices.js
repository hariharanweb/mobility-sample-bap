import * as dotenv from 'dotenv';
import Api from '../api/Api';
import ContextBuilder from '../utilities/ContextBuilder';
import LoggingService from './LoggingService';
import MessageRespository from '../repo/MessageRespository';

dotenv.config();

const init = async (initRequest) => {
  const logger = LoggingService.getLogger('InitService');
  const context = ContextBuilder.getContextWithContext('init', initRequest.context);
  const { message } = initRequest;
  const initPayload = {
    context,
    message,
  };
  const url = `${initRequest.context.bpp_uri}/init`;
  logger.debug(`Inite Pay Load ${initPayload}`);

  const initResponse = await Api.doPost(url, JSON.stringify(initPayload));
  const responseText = await initResponse.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

const storeInitResult = (response) => {
  MessageRespository.storeResult(response);
};

const getInitResult = (messageId) => MessageRespository.getResult(messageId);

export default {
  init,
  storeInitResult,
  getInitResult,
};
