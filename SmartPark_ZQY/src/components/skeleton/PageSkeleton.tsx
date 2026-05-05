import React from 'react';
import SkeletonAvatar from './SkeletonAvatar';
import SkeletonParagraph from './SkeletonParagraph';
import './index.scss';

type SkeletonType = 'form' | 'list' | 'detail' | 'dashboard';

interface PageSkeletonProps {
  type?: SkeletonType;
  avatar?: boolean;
  rows?: number;
  className?: string;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({
  type = 'list',
  avatar = false,
  rows = 3,
  className = '',
}) => {
  const renderFormSkeleton = () => (
    <div className="page-skeleton page-skeleton--form">
      <div className="page-skeleton__header">
        <SkeletonParagraph rows={1} width="30%" />
      </div>
      <div className="page-skeleton__form">
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div key={rowIndex} className="page-skeleton__form-row">
            <div className="page-skeleton__form-item">
              <SkeletonParagraph rows={1} width="20%" />
              <SkeletonParagraph rows={1} width="80%" />
            </div>
            <div className="page-skeleton__form-item">
              <SkeletonParagraph rows={1} width="20%" />
              <SkeletonParagraph rows={1} width="80%" />
            </div>
          </div>
        ))}
      </div>
      <div className="page-skeleton__actions">
        <div className="page-skeleton__button" />
        <div className="page-skeleton__button page-skeleton__button--secondary" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="page-skeleton page-skeleton--list">
      <div className="page-skeleton__header">
        <SkeletonParagraph rows={1} width="40%" />
      </div>
      <div className="page-skeleton__list">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="page-skeleton__list-item">
            {avatar && <SkeletonAvatar size="default" />}
            <div className="page-skeleton__list-content">
              <SkeletonParagraph rows={1} width={avatar ? '60%' : '40%'} />
              <SkeletonParagraph rows={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="page-skeleton page-skeleton--detail">
      <div className="page-skeleton__header">
        <SkeletonParagraph rows={1} width="60%" />
      </div>
      <div className="page-skeleton__detail">
        <div className="page-skeleton__detail-section">
          <SkeletonAvatar size="large" shape="square" />
          <div className="page-skeleton__detail-info">
            <SkeletonParagraph rows={2} width="50%" />
          </div>
        </div>
        <div className="page-skeleton__detail-content">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="page-skeleton__detail-row">
              <SkeletonParagraph rows={1} width="15%" />
              <SkeletonParagraph rows={1} width="40%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="page-skeleton page-skeleton--dashboard">
      <div className="page-skeleton__dashboard-cards">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="page-skeleton__dashboard-card">
            <div className="page-skeleton__dashboard-icon" />
            <div className="page-skeleton__dashboard-text">
              <SkeletonParagraph rows={1} width="60%" />
              <SkeletonParagraph rows={1} width="40%" />
            </div>
          </div>
        ))}
      </div>
      <div className="page-skeleton__dashboard-charts">
        <div className="page-skeleton__dashboard-chart" />
        <div className="page-skeleton__dashboard-chart" />
      </div>
      <div className="page-skeleton__dashboard-bottom">
        <div className="page-skeleton__dashboard-table">
          <SkeletonParagraph rows={rows} />
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'form':
        return renderFormSkeleton();
      case 'detail':
        return renderDetailSkeleton();
      case 'dashboard':
        return renderDashboardSkeleton();
      case 'list':
      default:
        return renderListSkeleton();
    }
  };

  return (
    <div className={`page-skeleton ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

export default PageSkeleton;