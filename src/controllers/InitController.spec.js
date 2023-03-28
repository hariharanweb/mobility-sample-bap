import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import InitController from './InitController';
import InitServices from '../services/InitServices';

beforeEach(() => {
  InitServices.init = vi.fn();
  InitServices.getInitResult = vi.fn();
});

const request = {
  context: {
    domain: 'nic2004:60221',
    country: 'IND',
    city: 'std:080',
    action: 'search',
    core_version: '1.0.0',
    bap_id: 'sample_mobility_bap',
    bap_uri: 'http://localhost:2010',
    transaction_id: 'd6f43bc3-3daf-4eca-9cde-54ae0c15a1fe',
    message_id: 'c39c712c-01ed-43e7-82cc-8ab08740b559',
    timestamp: '2023-02-02T10:46:23+05:30',
  },
  message: {
    intent: {
      fulfillment: {
        start: { location: { gps: '12.9372469,77.6109981' } },
        end: { location: { gps: '12.9702626,77.6099629' } },
      },
    },
  },
};

describe('Init controller', () => {
  it('should test init service is called', async () => {
    const res = {};
    res.send = vi.fn();
    await InitController.init(request, res);
    expect(InitServices.init).toBeCalled();
  });

  it('should test whether the response is send', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    await InitController.init(request, res);
    expect(res.send).toBeCalled();
  });

  it('should test whether the getInitResult from search service is called', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    const req = {
      query: {
        message_id: '1111',
      },
    };
    await InitController.initResult(req, res);
    expect(InitServices.getInitResult).toBeCalled();
  });
});
