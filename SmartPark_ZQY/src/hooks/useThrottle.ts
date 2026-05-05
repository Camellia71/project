import { useState, useRef, useCallback, useEffect } from 'react';

interface UseThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

/**
 * 节流 Hook - 限制函数执行频率，适用于按钮点击、滚动事件等场景
 * @param fn 要节流的函数
 * @param options 配置项
 */
export function useThrottle<T extends (...args: any[]) => any>(
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

        // 首次调用且启用 leading
        if (leading && lastTimeRef.current === 0) {
          lastTimeRef.current = now;
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

        // 记录待执行的参数（用于 trailing）
        if (trailing) {
          pendingArgsRef.current = args;
        }

        // 如果距上次执行时间超过 wait
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
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        } else if (!timerRef.current && trailing) {
          // 设置定时器处理 trailing 调用
          timerRef.current = setTimeout(() => {
            lastTimeRef.current = Date.now();
            timerRef.current = null;
            if (pendingArgsRef.current) {
              try {
                const result = fn(...pendingArgsRef.current);
                if (result instanceof Promise) {
                  result.then(resolve).catch(reject);
                } else {
                  resolve(result);
                }
              } catch (error) {
                reject(error);
              }
              pendingArgsRef.current = null;
            }
          }, wait - (now - lastTimeRef.current));
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

/**
 * 节流值 Hook - 限制值更新频率
 * @param value 要节流的值
 * @param wait 节流时间
 */
export function useThrottleValue<T>(value: T, wait: number = 300): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastTimeRef.current >= wait) {
      lastTimeRef.current = now;
      setThrottledValue(value);
    }
  }, [value, wait]);

  return throttledValue;
}