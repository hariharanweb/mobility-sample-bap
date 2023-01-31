import * as dotenv from 'dotenv';
import Api from '../api/Api';
import ContextBuilder from '../utilities/ContextBuilder';
import LoggingService from './LoggingService';
import MessageRespository from '../repo/MessageRespository';

dotenv.config();

const confirm = async (confirmRequest) => {
  const logger = LoggingService.getLogger('ConfirmService');
  const context = ContextBuilder.getContextWithContext('confirm', confirmRequest.context);
  const { message } = confirmRequest;
  const confirmPayload = {
    context,
    message,
  };
  const url = `${confirmRequest.context.bpp_uri}/confirm`;

  const confirmResponse = await Api.doPost(url, JSON.stringify(confirmPayload));
  const responseText = await confirmResponse.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

const storeConfirmResult = (response) => {
  MessageRespository.storeResult(response);
};

const getConfirmResult = (messageId) => MessageRespository.getResult(messageId);

export default {
  confirm,
  getConfirmResult,
  storeConfirmResult,
};
