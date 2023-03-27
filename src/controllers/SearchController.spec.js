import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import SearchController from './SearchController';
import SearchService from '../services/SearchService';

vi.mock('../services/SearchService');

beforeEach(() => {
  SearchService.search = vi.fn();
  SearchService.getSearchResult = vi.fn();
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

describe('should test search in controller', () => {
  it('should test search service is called', async () => {
    const res = {};
    res.send = vi.fn();
    await SearchController.search(request, res);
    expect(SearchService.search).toBeCalled();
  });

  it('should test whether the response is send', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    await SearchController.search(request, res);
    expect(res.send).toBeCalled();
  });
});

describe('should test searchResult in search controller', () => {
  it('should test whether the getSearchResult from search service is called', async () => {
    const res = {};
    res.send = vi.fn(() => 'response send');
    const req = {
      query: {
        message_id: '1111',
      },
    };
    await SearchController.searchResult(req, res);
    expect(SearchService.getSearchResult).toBeCalled();
  });
});
