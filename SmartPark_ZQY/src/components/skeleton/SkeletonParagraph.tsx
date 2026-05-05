import React from 'react';
import './index.scss';

interface SkeletonParagraphProps {
  rows?: number;
  width?: number | string | (number | string)[];
  className?: string;
}

const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  rows = 3,
  width,
  className = '',
}) => {
  const getWidth = (index: number): string | number | undefined => {
    if (Array.isArray(width)) {
      return width[index] || '100%';
    }
    if (width) {
      return width;
    }
    if (index === rows - 1) {
      return '60%';
    }
    return '100%';
  };

  return (
    <div className={`skeleton-paragraph ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="skeleton-paragraph__line"
          style={{ width: getWidth(index) }}
        />
      ))}
    </div>
  );
};

export default SkeletonParagraph;