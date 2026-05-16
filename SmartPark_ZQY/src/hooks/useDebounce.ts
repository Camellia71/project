import { useState, useRef, useCallback, useEffect } from 'react';

interface UseDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export function useDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: UseDebounceOptions = {}
) {
  const { wait = 300, leading = false, trailing = true } = options;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLeadingRef = useRef(true);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve, reject) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        if (leading && isLeadingRef.current) {
          isLeadingRef.current = false;
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

        timerRef.current = setTimeout(() => {
          isLeadingRef.current = true;
          if (trailing) {
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
          }
        }, wait);
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

  return debouncedFn;
}

export function useDebounceValue<T>(value: T, wait: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => clearTimeout(timer);
  }, [value, wait]);

  return debouncedValue;
}