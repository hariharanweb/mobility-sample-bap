import * as dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();

const getLogger = (key) => {
  const logger = log4js.getLogger(`BAP-${key}`);
  logger.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
  return logger;
};

export default {
  getLogger,
};
