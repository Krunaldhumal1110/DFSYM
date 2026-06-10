import type { ComponentType } from 'react';

type LazyModule = { default: ComponentType };

/**
 * Retries failed dynamic imports — common when a chunk fetch is cancelled
 * mid-navigation (e.g. during page exit animations on mobile).
 */
export function lazyRetry(
  factory: () => Promise<LazyModule>,
  retries = 2,
  delayMs = 600
): Promise<LazyModule> {
  return new Promise((resolve, reject) => {
    const attempt = (remaining: number) => {
      factory()
        .then(resolve)
        .catch((error: unknown) => {
          if (remaining <= 0) {
            reject(error);
            return;
          }
          window.setTimeout(() => attempt(remaining - 1), delayMs);
        });
    };

    attempt(retries);
  });
}
