import log4js from 'log4js';
import Api from '../api/Api';
import ContextBuilder from '../utilities/ContextBuilder';

const select = async (selectRequest) => {
  const logger = log4js.getLogger('SelectService');
  const context = ContextBuilder.getContext('select', selectRequest.context);
  const { message } = selectRequest;
  const selectPayload = {
    context,
    message,
  };
  const url = `${selectRequest.context.bpp_uri}/select`;

  const selectResponse = await Api.doPost(url, selectPayload);
  const responseText = await selectResponse.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

export default {
  select,
};
