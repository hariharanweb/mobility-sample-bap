import log4js from 'log4js';
import fetch from 'node-fetch';

const doPost = (url, body) => {
  const logger = log4js.getLogger('SearchService');
  logger.debug(`Posting to ${url} with Content ${body}`);
  return fetch(
    url,
    {
      method: 'post',
      body,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};

export default {
  doPost,
};
