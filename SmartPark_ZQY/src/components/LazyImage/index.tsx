import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import './index.scss';

export interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: React.ReactNode;
  errorPlaceholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  onLoad?: () => void;
  onError?: (error: string) => void;
}

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';
// 懒加载图片组件
// 当图片进入视口时，加载图片，否则显示占位符
// 图片加载完成后，显示图片，否则显示错误占位符
// 图片加载完成后，移除占位符
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  style,
  placeholder,
  errorPlaceholder,
  rootMargin = '100px',  //提前 100px 就开始加载，用户看到时图片已就绪
  threshold = 0.1,  // 10% 时触发加载
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [status, setStatus] = useState<LoadStatus>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    //使用 IntersectionObserver API 监听元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatus('loading');
            setImageSrc(src);  //开始加载图片
            observer.unobserve(entry.target);  //加载完成后后，取消观察，避免重复加载
          }
        });
      },
      {
        rootMargin,  // 触发加载的阈值，单位为像素
        threshold,  // 触发加载的阈值，0-1 之间的小数
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();   //组件卸载时清理观察器
    };
  }, [src, rootMargin, threshold]);

  useEffect(() => {
    //当 imageSrc 有值时（即进入可视区后）执行图片加载
    if (!imageSrc) return;

    //创建图片元素，不会渲染到 DOM 中
    const img = new Image();
    img.src = imageSrc;

    //捕捉图片加载完成事件，设置状态为 loaded 并调用 onLoad 回调函数
    img.onload = () => {
      setStatus('loaded');
      onLoad?.();
    };

    //捕捉图片加载失败事件，设置状态为 error 并调用 onError 回调函数
    img.onerror = () => {
      setStatus('error');
      onError?.(`Failed to load image: ${imageSrc}`);
    };
  }, [imageSrc, onLoad, onError]);


  //加载失败 + 有自定义错误占位 → 显示错误占位
  //有自定义占位 → 显示占位内容
  //都没有 → 显示默认空白占位
  const renderPlaceholder = () => {
    if (status === 'error' && errorPlaceholder) {
      return <div className="lazy-image__error">{errorPlaceholder}</div>;
    }
    if (placeholder) {
      return <div className="lazy-image__placeholder">{placeholder}</div>;
    }
    return <div className="lazy-image__default-placeholder" />;
  };


  //idle/loading → 显示占位符
  //loaded → 显示真正的 <img> 标签
  //error 且没有自定义错误占位 → 显示"图片加载失败"文字
  return (
    <div
      ref={containerRef}
      className={`lazy-image ${className}`}
      style={style}
    >
      {status === 'idle' && renderPlaceholder()}
      {status === 'loading' && renderPlaceholder()}
      {status === 'loaded' && (
        <img
          src={imageSrc}
          alt={alt}
          className="lazy-image__img lazy-image__img--loaded"
        />
      )}
      {status === 'error' && !errorPlaceholder && (
        <div className="lazy-image__error-icon">图片加载失败</div>
      )}
    </div>
  );
};

export default LazyImage;