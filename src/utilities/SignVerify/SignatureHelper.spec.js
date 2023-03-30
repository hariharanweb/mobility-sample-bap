import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import sodium from 'libsodium-wrappers';
import AuthHeaderSplitter from './AuthHeaderSplitter';
import SignatureHelper from './SignatureHelper';

beforeEach(() => {
  AuthHeaderSplitter.splitAuthHeader = vi.fn(() => ({ created: 'sample' }));
  sodium.crypto_sign_detached = vi.fn(() => 'signedMessage');
});

describe('Signature Helper', () => {
  it('should test getCreated', () => {
    const header = {
      'x-gateway-authorization': 'sample',
    };
    SignatureHelper.getCreated(header);
    expect(AuthHeaderSplitter.splitAuthHeader).toBeCalled();
  });

  it('should test getExpires', () => {
    const header = {
      'x-gateway-authorization': 'sample',
    };
    SignatureHelper.getExpires(header);
    expect(AuthHeaderSplitter.splitAuthHeader).toBeCalled();
  });

  it('should test create signing string', async () => {
    const body = {
      message: 'hello',
    };
    const created = 'created';
    const expires = 'expires';
    const expected = '(created): created\n(expires): expires\ndigest: BLAKE-512=tD+rxoBTDF1JjmNloKAy3N4FC6c0yQ2djbQ+BeLaeTkaQ0s+oBto4liQ0w5XUAOb1diQllRZ/kH+HAOvvB1AcQ==';
    const value = await SignatureHelper.createSigningStringUsingTime(body, created, expires);
    expect(value).toBe(expected);
  });

  it('should test getSignature', () => {
    const header = {
      'x-gateway-authorization': 'sample',
    };
    SignatureHelper.getSignature(header);
    expect(AuthHeaderSplitter.splitAuthHeader).toBeCalled();
  });

  it('should test createSignature', async () => {
    const body = 'sample';
    const createdAndExpiresValue = ['one', 'two'];
    const privateKey = 'key123';
    const expected = 'dGhpcyBpcyBtZXNzYWdl';

    sodium.crypto_sign_detached = vi.fn(() => 'this is message');
    sodium.from_base64 = vi.fn();

    const value = await SignatureHelper.createSignature(body, createdAndExpiresValue, privateKey);
    expect(value).toBe(expected);
  });
});
