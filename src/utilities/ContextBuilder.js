import * as dotenv from 'dotenv';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

dotenv.config();

const getContext = (action) => ({
  domain: 'nic2004:60221',
  country: 'IND',
  city: 'std:080',
  action,
  core_version: '1.0.0',
  bap_id: process.env.BUYER_APP_ID,
  bap_uri: process.env.BUYER_APP_URL,
  transaction_id: uuid(),
  message_id: uuid(),
  timestamp: moment().format(),
});

const getSubscriberContext = () => ({
  operation: {
    ops_no: 1,
  },
});

const getContextWithContext = (action, context) => ({
  ...context,
  domain: 'nic2004:60221',
  country: 'IND',
  city: 'std:080',
  action,
  core_version: '1.0.0',
  bap_id: process.env.BUYER_APP_ID,
  bap_uri: process.env.BUYER_APP_URL,
  transaction_id: uuid(),
  message_id: uuid(),
  timestamp: moment().format(),
});

export default {
  getContext,
  getSubscriberContext,
  getContextWithContext,
};
