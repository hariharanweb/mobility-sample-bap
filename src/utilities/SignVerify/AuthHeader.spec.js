import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import AuthHeader from './AuthHeader';
import SignatureHelper from './SignatureHelper';

beforeEach(() => {
  SignatureHelper.getCreatedAndExpires = vi.fn(() => ['sample1', 'sample2']);
  SignatureHelper.createSignature = vi.fn();
});

describe('AuthHeader', () => {
  it('should test whether created and expires values are obtained', async () => {
    await AuthHeader.generateAuthorizationHeaderValue();
    expect(SignatureHelper.getCreatedAndExpires).toBeCalled();
  });

  it('should test whether signature was obtained', async () => {
    await AuthHeader.generateAuthorizationHeaderValue();
    expect(SignatureHelper.createSignature).toBeCalled();
  });
});
