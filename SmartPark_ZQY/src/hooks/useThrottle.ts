import { useState, useRef, useCallback, useEffect } from 'react';

interface UseThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: UseThrottleOptions = {}
) {
  const { wait = 300, leading = true, trailing = false } = options;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimeRef = useRef(0);
  const pendingArgsRef = useRef<Parameters<T> | null>(null);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve, reject) => {
        const now = Date.now();

        if (leading && lastTimeRef.current === 0) {
          lastTimeRef.current = now;
          try {
            const result = fn(...args);
            if (result instanceof Promise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result as ReturnType<T>);
            }
            return;
          } catch (error) {
            reject(error);
            return;
          }
        }

        if (trailing) {
          pendingArgsRef.current = args;
        }

        if (now - lastTimeRef.current >= wait) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          lastTimeRef.current = now;
          try {
            const result = fn(...args);
            if (result instanceof Promise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result as ReturnType<T>);
            }
          } catch (error) {
            reject(error);
          }
        } else if (!timerRef.current && trailing) {
          timerRef.current = setTimeout(
            () => {
              lastTimeRef.current = Date.now();
              timerRef.current = null;
              if (pendingArgsRef.current) {
                try {
                  const result = fn(...pendingArgsRef.current);
                  if (result instanceof Promise) {
                    result.then(resolve).catch(reject);
                  } else {
                    resolve(result as ReturnType<T>);
                  }
                } catch (error) {
                  reject(error);
                }
                pendingArgsRef.current = null;
              }
            },
            wait - (now - lastTimeRef.current)
          );
        }
      });
    },
    [fn, wait, leading, trailing]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return throttledFn;
}

export function useThrottleValue<T>(value: T, wait: number = 300): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setThrottledValue(value);
    }, wait);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, wait]);

  return throttledValue;
}