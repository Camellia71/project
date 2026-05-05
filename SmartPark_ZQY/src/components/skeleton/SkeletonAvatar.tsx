import React from 'react';
import './index.scss';

interface SkeletonAvatarProps {
  size?: 'small' | 'default' | 'large';
  shape?: 'circle' | 'square';
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'default',
  shape = 'circle',
  width,
  height,
  className = '',
}) => {
  const sizeMap = {
    small: 24,
    default: 40,
    large: 64,
  };

  const avatarWidth = width || sizeMap[size];
  const avatarHeight = height || (shape === 'circle' ? avatarWidth : 'auto');

  return (
    <div
      className={`skeleton-avatar skeleton-avatar--${shape} ${className}`}
      style={{
        width: avatarWidth,
        height: avatarHeight,
      }}
    />
  );
};

export default SkeletonAvatar;