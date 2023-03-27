import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import ConfirmController from './ConfirmController';
import ConfirmService from '../services/ConfirmService';

vi.mock('../services/ConfirmService');

beforeEach(() => {
  ConfirmService.confirm = vi.fn();
  ConfirmService.confirm = vi.fn();
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

describe('should test confirm controller', () => {
  it('should test confirm service is called', async () => {
    const res = {};
    res.send = vi.fn();
    await ConfirmController.confirm(request, res);
    expect(ConfirmService.confirm).toBeCalled();
  });

  it('should test whether the response is send', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    await ConfirmController.confirm(request, res);
    expect(res.send).toBeCalled();
  });
});

describe('should test confirmResult in conifrm controller', () => {
  it('should test whether the getConfirmResult from search service is called', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    const req = {
      query: {
        message_id: '1111',
      },
    };
    await ConfirmController.confirmResult(req, res);
    expect(ConfirmService.getConfirmResult).toBeCalled();
  });
});
