import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import LookUpService from '../services/LookUpService';
import OnConfirmController from './OnConfirmController';
import authVerifier from '../utilities/SignVerify/AuthHeaderVerifier';
import ConfirmService from '../services/ConfirmService';
import GenericResponse from '../utilities/GenericResponse';

beforeEach(() => {
  // eslint-disable-next-line no-console
  LookUpService.getPublicKeyWithUkId = vi.fn();
  authVerifier.authorize = vi.fn(() => Promise.resolve(true));
  // eslint-disable-next-line no-console
  ConfirmService.storeConfirmResult = vi.fn();
  GenericResponse.sendAcknowledgement = vi.fn();
  GenericResponse.sendErrorWithAuthorization = vi.fn();
});

const request = {
  body: {
    context: {
      action: 'confirm',
      transaction_id: 'd9f230fa-75ce-4f41-93bd-9ddde350c900',
      bpp_uri: 'http://localhost:46073',
      domain: 'nic2004:60221',
      country: 'IND',
      city: 'std:080',
      core_version: '1.0.0',
      bap_id: 'sample_mobility_bap',
      bap_uri: 'http://localhost:2010',
      message_id: '636c3c28-2769-4d96-b80c-4d9d2d8bdc1b',
      timestamp: '2023-03-27T17:21:37+05:30',
      bpp_id: 'sample_mobility_bpp_cabs',
    },
    message: {
      order: {
        id: '82a2ddd8-464f-46cc-9eef-b2d7a982e865',
        provider: { id: '19a89e74-03d2-4126-b94c-34bf7adcedb2' },
        items: [{
          id: 'Bake_SUV_ID', fulfillment_id: 'Bake_SUV_FULFILLMENT_ID', descriptor: { name: 'SUV', code: 'SUV_TAXI', images: ['https://cdn.iconscout.com/icon/premium/png-256-thumb/taxi-2716987-2254385.png'] }, price: { currency: 'INR', value: '1411' }, category_id: 'Bake_TAXI_SUV', time: { duration: '00:45' },
        }],
        fulfillment: {
          tracking: false,
          start: { location: { gps: '9.9312328, 76.2673041' }, time: { timestamp: '2023-03-27T11:51:13.366Z' } },
          end: { location: { gps: '12.9702626,77.6099629' } },
          agent: {
            name: 'Nikhil', dob: '01/02/1996', gender: 'Male', phone: '9876543210', email: 'nikhil@gmail.com',
          },
          vehicle: {
            category: 'Cab', capacity: '4', model: 'Sedan', color: 'black', energy_type: 'fuel', registration: 'DL 04 4444',
          },
        },
      },
    },
  },
};

describe('should test OnConfirm', () => {
  it('should test whether public key is acquired', async () => {
    await OnConfirmController.onConfirm(request);
    expect(LookUpService.getPublicKeyWithUkId).toBeCalled();
  });

  it('should test for authorize is called', async () => {
    await OnConfirmController.onConfirm(request);
    expect(authVerifier.authorize).toHaveBeenCalled();
  });

  it('should test for storeConfirmResult is called', async () => {
    await OnConfirmController.onConfirm(request);
    expect(ConfirmService.storeConfirmResult).toBeCalled();
  });

  it('should test for onConfirm response', async () => {
    const res = {};
    await OnConfirmController.onConfirm(request, res);
    expect(GenericResponse.sendAcknowledgement).toBeCalledWith(res);
  });

  it('should test for authorization failure', async () => {
    authVerifier.authorize = vi.fn(() => Promise.reject(new Error('fail')));
    const res = {};
    await OnConfirmController.onConfirm(request, res);
    expect(GenericResponse.sendErrorWithAuthorization).toBeCalled();
  });
});
