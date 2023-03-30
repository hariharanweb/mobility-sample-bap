import {
  beforeEach, expect, it, vi, describe,
} from 'vitest';
import sodium from 'libsodium-wrappers';
import AuthHeaderVerifier from './AuthHeaderVerifier';
import SignatureHelper from './SignatureHelper';

beforeEach(() => {
  SignatureHelper.getSignature = vi.fn(() => 'signature');
  SignatureHelper.createSigningStringUsingTime = vi.fn(() => 'sample');
  sodium.crypto_sign_verify_detached = vi.fn(() => true);
  SignatureHelper.getCreated = vi.fn(() => 'sample');
  SignatureHelper.getExpires = vi.fn(() => 'sample');
  sodium.from_base64 = vi.fn();
});

describe('Signature Helper', () => {
  it('should test authorize', async () => {
    const req = {
      headers: 'sample',
    };
    const value = await AuthHeaderVerifier.authorize(req, 'key');
    expect(value).toBe(true);
  });
});
