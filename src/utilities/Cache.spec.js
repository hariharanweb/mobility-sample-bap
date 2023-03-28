import { it, expect, describe } from 'vitest';
import cache from './Cache';

describe('Cache', () => {
  it('should test for set and get cache', () => {
    const cachekey = 'key';
    cache.setCache(cachekey, 'sample');

    const resultFn = (key) => cache.getCache(key);

    expect(resultFn(cachekey)).toBe('sample');
  });
});
