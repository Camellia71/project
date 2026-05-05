import { useState, useRef, useCallback, useEffect } from 'react';

interface UseDebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

/**
 * 防抖 Hook - 延迟执行函数，适用于搜索输入等场景
 * @param fn 要防抖的函数
 * @param options 配置项
 */
export function useDebounce<T extends (...args: any[]) => any>(
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

        // 首次调用且启用 leading
        if (leading && isLeadingRef.current) {
          isLeadingRef.current = false;
          try {
            const result = fn(...args);
            if (result instanceof Promise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
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
                resolve(result);
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

/**
 * 防抖值 Hook - 延迟更新值，适用于搜索输入等场景
 * @param value 要防抖的值
 * @param wait 延迟时间
 */
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