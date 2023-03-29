import {
  it, expect, describe, beforeEach, vi,
} from 'vitest';
import Api from '../api/Api';
import MessageRespository from '../repo/MessageRespository';
import ContextBuilder from '../utilities/ContextBuilder';
import SearchService from './SearchService';

const message = {
  body: 'hi there',
};

beforeEach(() => {
  ContextBuilder.getContext = vi.fn();
  MessageRespository.storeResult = vi.fn();
  MessageRespository.getResult = vi.fn();
  const responseJson = [{ signing_public_key: 'OK' }];
  Api.doPost = vi.fn(() => Promise.resolve({
    text: () => Promise.resolve(responseJson),
  }));
});

describe('Search Service', () => {
  it('should test whether context is recived', () => {
    SearchService.search(message);
    expect(ContextBuilder.getContext).toBeCalled();
  });

  it('should test whether the api request have been send', () => {
    SearchService.search(message);
    expect(Api.doPost).toBeCalled();
  });

  it('should test storeSearchResult', async () => {
    const response = {};
    SearchService.storeSearchResult(response);
    expect(MessageRespository.storeResult).toBeCalled();
  });

  it('should test getSearchResult', () => {
    const messageId = {};
    SearchService.getSearchResult(messageId);
    expect(MessageRespository.getResult).toBeCalled();
  });
});
