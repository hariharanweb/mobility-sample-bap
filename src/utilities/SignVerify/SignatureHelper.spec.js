import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import sodium from 'libsodium-wrappers';
import AuthHeaderSplitter from './AuthHeaderSplitter';
import SignatureHelper from './SignatureHelper';

beforeEach(() => {
  AuthHeaderSplitter.splitAuthHeader = vi.fn(() => ({ created: 'sample' }));
  sodium.crypto_sign_detached = vi.fn(() => 'signedMessage');
  sodium.from_base64 = vi.fn();
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

    const value = await SignatureHelper.createSignature(body, createdAndExpiresValue, privateKey);
    expect(value).toBe(expected);
  });

  it('should test createSignedData', () => {
    const expected = 'new message';
    sodium.to_base64 = vi.fn(() => 'new message');
    const value = SignatureHelper.createSignedData();

    expect(value).toBe(expected);
  });
});
