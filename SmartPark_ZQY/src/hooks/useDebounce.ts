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
 * 两个参数：一个是需要防抖的原始函数fn，另一个是配置项。
 * 配置项里有三个参数：wait控制延迟时间，默认300毫秒；leading控制是否在首次触发时立即执行；trailing控制是否在延迟结束后执行最后一次，默认为true。
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  options: UseDebounceOptions = {}
) {
  const { wait = 300, leading = false, trailing = true } = options;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLeadingRef = useRef(true);
  //timerRef存的是定时器ID，方便在组件卸载或者新调用时清理；
  // isLeadingRef存的是一个标志位，用来标记当前是不是新一轮调用的第一次触发，这个标志位是实现leading功能的关键。

  //核心逻辑在useCallback里返回了一个函数。这个函数会返回一个Promise，这样调用方就能用async/await拿到函数执行的结果，也可以做错误捕获
  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve, reject) => {
        if (timerRef.current) {
          //防抖的核心判断逻辑。如果定时器已经存在，就先清掉，这是防抖的基本行为，保证在频繁调用时只有最后一次会真正执行。
          clearTimeout(timerRef.current);
        }

        // 首次调用且启用 leading
        //处理leading场景。如果开启了leading，并且这是新一轮的第一次调用，就立即执行原函数，然后把标志位改成false，避免后续调用再次立即执行。
        // 执行完后直接return，不会往下走到定时器。
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

        //定时器回调里处理trailing场景。等延迟时间到了，把标志位恢复成true，为下一轮调用做准备。
        // 如果trailing是true，就执行原函数并把结果通过Promise返回。
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
