import React, { useState, useCallback, useRef, useEffect } from 'react';
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

type ClickHandler = ((event: React.MouseEvent<HTMLElement>) => unknown) | undefined;

function useSafeClick<T extends (...args: unknown[]) => unknown>(
  fn: T,
  mode: SafeButtonMode,
  options: { wait: number; leading: boolean; trailing: boolean }
): T {
  const debouncedFn = useDebounce(fn, options);
  const throttledFn = useThrottle(fn, options);

  const enhancedFn = mode === 'throttle' ? throttledFn : debouncedFn;

  return enhancedFn as T;
}

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

  const optionsRef = useRef({ wait, leading, trailing });
  useEffect(() => {
    optionsRef.current = { wait, leading, trailing };
  }, [wait, leading, trailing]);

  const handleClick = useCallback(async (event: React.MouseEvent<HTMLElement>) => {
    if (onBeforeClick) {
      const result = onBeforeClick();
      if (result === false) {
        return;
      }
    }

    const onClickFn = onClick as ClickHandler;
    if (!onClickFn) {
      onAfterClick?.(true);
      return;
    }

    try {
      const result = onClickFn(event);
      
      if (result !== null && result !== undefined && typeof result === 'object' && 'then' in result) {
        setLoading(true);
        await result;
        setLoading(false);
        onAfterClick?.(true);
      } else {
        onAfterClick?.(true);
      }
    } catch (error) {
      setLoading(false);
      onAfterClick?.(false, error);
      throw error;
    }
  }, [onClick, onBeforeClick, onAfterClick]);

  const wrappedFn = useCallback((event: unknown) => {
    return handleClick(event as React.MouseEvent<HTMLElement>);
  }, [handleClick]);

  const enhancedClick = useSafeClick(wrappedFn, mode, { wait, leading, trailing });

  return (
    <Button
      {...props}
      loading={loading}
      disabled={disabledOnLoading ? props.disabled || loading : props.disabled}
      onClick={(e) => enhancedClick(e)}
    >
      {children}
    </Button>
  );
};

export default SafeButton;
