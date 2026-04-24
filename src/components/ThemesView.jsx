import React from 'react';
import { ThemeCardSkeleton } from './ui/Skeleton';
import Card from './ui/Card';
import Button from './ui/Button';

const ThemesView = ({ themes, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-text-primary">
          Analyzing Themes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <ThemeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-danger-subtle border-danger">
        <h3 className="text-base font-semibold text-danger mb-2">
          Theme Analysis Failed
        </h3>
        <p className="text-sm text-danger mb-4">{error}</p>
        <Button variant="secondary" size="sm">
          Retry Analysis
        </Button>
      </Card>
    );
  }

  if (!themes || themes.length === 0) {
    return (
      <Card className="p-6 bg-background-tertiary">
        <h3 className="text-base font-semibold text-text-primary mb-2">
          No Themes Available
        </h3>
        <p className="text-sm text-text-secondary">
          Upload CSV and generate themes to see analysis results.
        </p>
      </Card>
    );
  }

  const SentimentPill = ({ sentiment }) => {
    const getColorClass = () => {
      switch (sentiment) {
        case 'positive':
          return 'bg-success-subtle text-success';
        case 'negative':
          return 'bg-danger-subtle text-danger';
        case 'mixed':
          return 'bg-warning-subtle text-warning';
        default:
          return 'bg-background-tertiary text-text-tertiary';
      }
    };

    return (
      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${getColorClass()}`}>
        {sentiment}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-text-primary">
        Key Themes ({themes.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card key={theme.id} interactive className="p-4">
            {/* Header with name and sentiment */}
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-base font-semibold text-text-primary leading-tight">
                {theme.name}
              </h4>
              <SentimentPill sentiment={theme.sentiment} />
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {theme.description}
            </p>

            {/* Review count */}
            <div className="text-xs font-medium text-text-tertiary mb-3">
              <span className="text-text-primary">{theme.review_count}</span> reviews
            </div>

            {/* Sample reviews */}
            {theme.sample_reviews && theme.sample_reviews.length > 0 && (
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-text-tertiary mb-2">
                  Sample Reviews:
                </p>
                <div className="space-y-1">
                  {theme.sample_reviews.map((review, index) => (
                    <p key={index} className="text-xs text-text-secondary italic">
                      "{review}"
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemesView;
