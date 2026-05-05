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

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  style,
  placeholder,
  errorPlaceholder,
  rootMargin = '100px',
  threshold = 0.1,
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [status, setStatus] = useState<LoadStatus>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatus('loading');
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [src, rootMargin, threshold]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setStatus('loaded');
      onLoad?.();
    };

    img.onerror = () => {
      setStatus('error');
      onError?.(`Failed to load image: ${imageSrc}`);
    };
  }, [imageSrc, onLoad, onError]);

  const renderPlaceholder = () => {
    if (status === 'error' && errorPlaceholder) {
      return <div className="lazy-image__error">{errorPlaceholder}</div>;
    }
    if (placeholder) {
      return <div className="lazy-image__placeholder">{placeholder}</div>;
    }
    return <div className="lazy-image__default-placeholder" />;
  };

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