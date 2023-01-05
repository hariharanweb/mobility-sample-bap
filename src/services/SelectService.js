import Api from '../api/Api';
import ContextBuilder from '../utilities/ContextBuilder';
import LoggingService from './LoggingService';

const select = async (selectRequest) => {
  const logger = LoggingService.getLogger('SelectService');
  const context = ContextBuilder.getContext('select', selectRequest.context);
  const { message } = selectRequest;
  const selectPayload = {
    context,
    message,
  };
  const url = `${selectRequest.context.bpp_uri}/select`;

  const selectResponse = await Api.doPost(url, JSON.stringify(selectPayload));
  const responseText = await selectResponse.text();
  logger.debug(`Response ${responseText}`);
  return context;
};

export default {
  select,
};
