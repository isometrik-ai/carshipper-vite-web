type CacheEntry<T> = {
  promise: Promise<T>;
  expiresAt: number;
};

export type BoundedPromiseCacheOptions<TArgs extends unknown[]> = {
  maxEntries: number;
  ttlMs: number;
  keyFn?: (...args: TArgs) => string;
};

/**
 * Memoizes async calls by key with LRU eviction and TTL.
 * Expired entries are dropped on read; capacity is enforced with LRU when adding new keys.
 */
export function createBoundedPromiseCache<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: BoundedPromiseCacheOptions<TArgs>
): (...args: TArgs) => Promise<TReturn> {
  const { maxEntries, ttlMs, keyFn = (...args: TArgs) => JSON.stringify(args) } = options;
  const cache = new Map<string, CacheEntry<TReturn>>();

  const touch = (key: string, entry: CacheEntry<TReturn>) => {
    cache.delete(key);
    cache.set(key, entry);
  };

  return (...args: TArgs): Promise<TReturn> => {
    const key = keyFn(...args);
    const now = Date.now();
    const existing = cache.get(key);

    if (existing) {
      if (now < existing.expiresAt) {
        touch(key, existing);
        return existing.promise;
      }
      cache.delete(key);
    }

    if (cache.size >= maxEntries && !cache.has(key)) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        cache.delete(oldestKey);
      }
    }

    const promise = fn(...args);
    const entry: CacheEntry<TReturn> = { promise, expiresAt: now + ttlMs };
    cache.delete(key);
    cache.set(key, entry);

    return promise;
  };
}
