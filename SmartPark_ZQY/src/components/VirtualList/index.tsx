import React, { useEffect, useRef, useState, useCallback, useMemo, CSSProperties } from 'react';
import './index.scss';

export interface VirtualListProps<T = unknown> {
  items: T[];
  height: number | string;
  itemHeight: number;
  overscan?: number;
  className?: string;
  style?: CSSProperties;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
  onScroll?: (scrollTop: number, clientHeight: number) => void;
}

function VirtualList<T = unknown>({
  items,
  height,
  itemHeight,
  overscan = 3,
  className = '',
  style,
  renderItem,
  getItemKey,
  onScroll,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const containerHeight = typeof height === 'number' ? height : height;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setClientHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    setClientHeight(container.clientHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const newScrollTop = container.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop, clientHeight);
  }, [clientHeight, onScroll]);

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(clientHeight / itemHeight);
    const end = Math.min(items.length - 1, start + visibleCount + overscan * 2);
    const offset = start * itemHeight;

    return {
      startIndex: start,
      endIndex: end,
      offsetY: offset,
    };
  }, [scrollTop, clientHeight, itemHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    const result: { item: T; index: number }[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      result.push({ item: items[i], index: i });
    }
    return result;
  }, [items, startIndex, endIndex]);

  const totalHeight = items.length * itemHeight;

  const getKey = useCallback(
    (item: T, index: number): string | number => {
      if (getItemKey) {
        return getItemKey(item, index);
      }
      return index;
    },
    [getItemKey]
  );

  return (
    <div
      ref={containerRef}
      className={`virtual-list ${className}`}
      style={{ height: containerHeight, ...style }}
      onScroll={handleScroll}
    >
      <div className="virtual-list__content" style={{ height: totalHeight }}>
        <div
          className="virtual-list__offset"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={getKey(item, index)}
              className="virtual-list__item"
              style={{ height: itemHeight }}
              data-index={index}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualList;