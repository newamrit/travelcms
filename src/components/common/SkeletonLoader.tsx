import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'wave'
}: SkeletonProps) {
  const baseClasses = 'bg-slate-200';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton',
    none: ''
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
}

// Pre-built skeleton components for common use cases

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 animate-pulse">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="40%" height={16} />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <Skeleton variant="text" width="60%" />
      </td>
      <td className="px-4 py-3">
        <Skeleton variant="text" width="80%" />
      </td>
      <td className="px-4 py-3">
        <Skeleton variant="text" width="50%" />
      </td>
      <td className="px-4 py-3">
        <Skeleton variant="text" width="40%" />
      </td>
      <td className="px-4 py-3">
        <Skeleton variant="rounded" width={80} height={24} />
      </td>
    </tr>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-5 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={60} height={16} />
      </div>
      <Skeleton variant="text" width="70%" height={32} className="mt-3" />
      <Skeleton variant="text" width="50%" height={16} className="mt-1" />
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton variant="text" width="30%" height={16} className="mb-2" />
            <Skeleton variant="rounded" width="100%" height={40} />
          </div>
        ))}
      </div>
      <div>
        <Skeleton variant="text" width="20%" height={16} className="mb-2" />
        <Skeleton variant="rounded" width="100%" height={100} />
      </div>
      <div className="flex justify-end gap-3">
        <Skeleton variant="rounded" width={100} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </div>
    </div>
  );
}
