import React from 'react';
import Card from './ui/Card';

const PulseView = ({ pulse }) => {
  if (!pulse) return null;

  const { week, pulse: pulseData } = pulse;
  const { top_themes, action_ideas } = pulseData;

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

  const RankBadge = ({ rank }) => {
    const getBadgeClass = () => {
      if (rank === 1) return 'bg-accent text-white';
      return 'bg-background-tertiary text-text-primary';
    };

    return (
      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-medium ${getBadgeClass()}`}>
        {rank}
      </div>
    );
  };

  return (
    <section className="mb-8">
      <Card className="p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary mb-2">
            Weekly Pulse
          </h2>
          <p className="text-sm text-text-secondary font-mono">{week}</p>
        </div>

        {/* Top Themes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold tracking-tight text-text-primary mb-6">
            Top Themes
          </h3>
          <div className="space-y-6">
            {top_themes.map((theme, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <RankBadge rank={theme.rank} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-base font-semibold text-text-primary">
                        {theme.name}
                      </h4>
                      <SentimentPill sentiment={theme.sentiment} />
                    </div>
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {theme.description}
                    </p>
                    <div className="text-xs font-medium text-text-tertiary mb-4">
                      {theme.review_count} reviews
                    </div>
                    
                    <div className="bg-background-tertiary rounded-lg p-4">
                      <p className="text-sm text-text-secondary italic">
                        "{theme.user_quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Ideas */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-text-primary mb-6">
            Action Ideas
          </h3>
          <Card className="p-6 bg-accent-subtle border-accent">
            <ol className="space-y-4">
              {action_ideas.map((idea, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-text-primary leading-relaxed">
                    {idea}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </Card>
    </section>
  );
};

export default PulseView;
