import { describe, expect, it } from 'vitest';
import moment from 'moment';
import contextBuilder from './ContextBuilder';

const context = {
  domain: 'sample',
  country: 'sample',
  city: 'sample',
  action: '',
  core_version: 'sample',
  bap_id: 'sample_mobility_bap',
  bap_uri: 'http://localhost:2010',
  transaction_id: 'f549266e-4297-4c21-81a6-5f9fa59a7a4c',
  message_id: '',
  timestamp: '2023-02-01T16:22:18+05:30',
  bpp_id: '',
  bpp_uri: '',
};

describe('test context builder', () => {
  it('should test getContext', () => {
    const action = 'select';
    const contextResult = contextBuilder.getContext(action);
    const contextFinal = {
      domain: 'nic2004:60221',
      country: 'IND',
      city: 'std:080',
      action: 'select',
      core_version: '1.0.0',
      bap_id: process.env.BUYER_APP_ID,
      bap_uri: process.env.BUYER_APP_URL,
      timestamp: moment().format(),
    };
    expect(contextResult).toMatchObject(contextFinal);
  });

  it('should test getSubscriberContext', () => {
    const expectedValue = {
      operation: {
        ops_no: 1,
      },
    };
    const returnedValue = contextBuilder.getSubscriberContext();
    expect(expectedValue).toStrictEqual(returnedValue);
  });

  it('should test getContextwithContext', () => {
    const action = 'select';
    const contextResult = contextBuilder.getContextWithContext(action, context);
    const contextFinal = {
      domain: 'nic2004:60221',
      country: 'IND',
      city: 'std:080',
      action: 'select',
      core_version: '1.0.0',
      bap_id: process.env.BUYER_APP_ID,
      bap_uri: process.env.BUYER_APP_URL,
      timestamp: moment().format(),
    };
    expect(contextResult).toMatchObject(contextFinal);
  });
});
