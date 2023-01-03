import fetch from 'node-fetch';
import LoggingService from '../services/LoggingService';
import authHeader from '../utilities/AuthHeader';

const doPost = async (url, bodyValue) => {
  const logger = LoggingService.getLogger('API');
  logger.debug(`Posting to ${url} with Content ${bodyValue}`);

  const createdAndExpiresValue = authHeader.getCreatedAndExpires();
  logger.debug(`Created Value: ${createdAndExpiresValue[0]}, Expires Value :
  ${createdAndExpiresValue[1]}`);

  const signature = await authHeader
    .createSignature(bodyValue, createdAndExpiresValue);
  logger.debug(`Signature Value ${signature}`);

  const gatewayAuthHeaderValue = authHeader
    .createAuthorizationHeader(signature, createdAndExpiresValue);
  logger.debug(`Header Value: ${gatewayAuthHeaderValue}`);

  return fetch(url, {
    method: 'post',
    body: bodyValue,
    headers: {
      'X-Gateway-Authorization': gatewayAuthHeaderValue,
      'Content-Type': 'application/json',
    },
  });
};

export default {
  doPost,
};
