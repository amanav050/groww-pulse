import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div 
      className={`bg-background-tertiary animate-pulse rounded ${className}`}
      {...props}
    />
  );
};

export const ThemeCardSkeleton = () => {
  return (
    <div className="bg-background-primary border border-border rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="mb-3">
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <div className="space-y-2 mb-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="text-sm text-text-tertiary mb-3">
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="border-t border-border pt-3">
        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  );
};

export const PulseSkeleton = () => {
  return (
    <div className="bg-background-primary border border-border rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-32" />
      </div>
      
      <div className="mb-8">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="bg-background-tertiary rounded p-3">
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="bg-accent-subtle border border-border rounded-lg p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start">
                <Skeleton className="h-4 w-6 mr-3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
