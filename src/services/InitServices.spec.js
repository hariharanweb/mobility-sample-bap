import {
  it, expect, describe, beforeEach, vi,
} from 'vitest';
import Api from '../api/Api';
import MessageRespository from '../repo/MessageRespository';
import ContextBuilder from '../utilities/ContextBuilder';
import InitServices from './InitServices';

beforeEach(() => {
  ContextBuilder.getContextWithContext = vi.fn();
  MessageRespository.storeResult = vi.fn();
  MessageRespository.getResult = vi.fn();
  const responseText = 'OK';
  Api.doPost = vi.fn(() => Promise.resolve({
    text: () => Promise.resolve(responseText),
  }));
});

const request = {
  context: {
    action: 'confirm',
    transaction_id: '236176d7-a384-4ea9-8fe1-b2a6ebeec3da',
    bpp_uri: 'http://localhost:56534',
  },
  message: {
    order: {
      id: '18ac5356-e791-4574-adb5-ee5a23c0483e',
      provider: { id: 'c1bfe26a-9455-46d0-b11a-082f22c1f0e2' },
      items: [
        {
          id: 'Bake_SEDAN_ID',
          fulfillment_id: 'Bake_SEDAN_FULFILLMENT_ID',
          descriptor: {
            name: 'Sedan',
            code: 'SEDAN_TAXI',
            images: [
              'https://cdn.iconscout.com/icon/premium/png-256-thumb/sedan-car-469131.png',
            ],
          },
          price: { currency: 'INR', value: '1111' },
          category_id: 'Bake_TAXI_SEDAN',
          time: { duration: '00:45' },
        },
      ],
      fulfillment: {
        tracking: false,
        start: {
          location: { gps: '12.9298819961062, 77.62865178465772' },
          time: { timestamp: '2023-03-28T09:32:34.362Z' },
        },
        end: { location: { gps: '12.9702626,77.6099629' } },
      },
    },
  },
};

describe('Init Service', () => {
  it('should test whether getContextWithContext was called', async () => {
    await InitServices.init(request);
    expect(ContextBuilder.getContextWithContext).toBeCalled();
  });

  it('should test whether the post call is made', async () => {
    await InitServices.init(request);
    expect(Api.doPost).toBeCalled();
  });

  it('should test storeInitResult', async () => {
    const response = {};
    InitServices.storeInitResult(response);
    expect(MessageRespository.storeResult).toBeCalled();
  });

  it('should test getInitResult', () => {
    const messageId = {};
    InitServices.getInitResult(messageId);
    expect(MessageRespository.getResult).toBeCalled();
  });
});
