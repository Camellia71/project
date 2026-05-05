import React, { useState, useCallback, useMemo } from 'react';
import { Button, ButtonProps } from 'antd';
import { useDebounce } from '../../hooks/useDebounce';
import { useThrottle } from '../../hooks/useThrottle';

export type SafeButtonMode = 'debounce' | 'throttle';

export interface SafeButtonProps extends ButtonProps {
  mode?: SafeButtonMode;
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  onBeforeClick?: () => void | boolean;
  onAfterClick?: (success: boolean, error?: unknown) => void;
  disabledOnLoading?: boolean;
}

/**
 * SafeButton 组件 - 支持防抖/节流双模式，智能识别 Promise 自动进入 Loading
 * 
 * @example 防抖模式（搜索按钮）
 * <SafeButton mode="debounce" wait={300} onClick={handleSearch}>
 *   搜索
 * </SafeButton>
 * 
 * @example 节流模式（快速点击按钮）
 * <SafeButton mode="throttle" wait={500} onClick={handleSubmit}>
 *   提交
 * </SafeButton>
 * 
 * @example 带前置校验
 * <SafeButton 
 *   onClick={handleSubmit}
 *   onBeforeClick={() => validateForm()}
 * >
 *   提交
 * </SafeButton>
 */
const SafeButton: React.FC<SafeButtonProps> = ({
  mode = 'debounce',
  wait = 300,
  leading = false,
  trailing = true,
  onClick,
  onBeforeClick,
  onAfterClick,
  disabledOnLoading = true,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  // 创建包装函数，处理 MouseEvent 参数
  const wrappedClick = useMemo(() => {
    if (!onClick) return undefined;
    
    return (event: React.MouseEvent<HTMLElement>) => {
      return onClick(event);
    };
  }, [onClick]);

  // 根据模式选择对应的 Hook
  const enhancedClick = useMemo(() => {
    if (!wrappedClick) return undefined;

    const options = { wait, leading, trailing };
    
    if (mode === 'throttle') {
      return useThrottle(wrappedClick, options);
    }
    return useDebounce(wrappedClick, options);
  }, [wrappedClick, mode, wait, leading, trailing]);

  const handleClick = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
    // 前置校验
    if (onBeforeClick) {
      const result = onBeforeClick();
      // 如果返回 false，阻止点击
      if (result === false) {
        return;
      }
    }

    // 如果没有增强后的点击函数，直接调用原始 onClick
    if (!enhancedClick && onClick) {
      onClick(event);
      return;
    }

    if (!enhancedClick) return;

    try {
      const result = enhancedClick(event);

      // 智能识别 Promise，自动进入 Loading 状态
      if (result instanceof Promise) {
        setLoading(true);
        const returnValue = await result;
        setLoading(false);
        onAfterClick?.(true);
        return returnValue;
      } else {
        onAfterClick?.(true);
        return result;
      }
    } catch (error) {
      setLoading(false);
      onAfterClick?.(false, error);
      throw error;
    }
  }, [enhancedClick, onBeforeClick, onAfterClick, onClick]);

  return (
    <Button
      {...props}
      loading={loading}
      disabled={disabledOnLoading ? props.disabled || loading : props.disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default SafeButton;