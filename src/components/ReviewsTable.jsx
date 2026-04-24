import { Star } from 'lucide-react'
import Card from './ui/Card'

const ReviewsTable = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-warning text-warning'
                : 'fill-background-tertiary text-text-tertiary'
            }`}
          />
        ))}
      </div>
    );
  };

  const RatingPill = ({ rating }) => {
    const getColorClass = () => {
      if (rating >= 4) return 'bg-success-subtle text-success';
      if (rating >= 3) return 'bg-warning-subtle text-warning';
      return 'bg-danger-subtle text-danger';
    };

    return (
      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${getColorClass()}`}>
        {rating}/5
      </span>
    );
  };

  const PlatformPill = ({ platform }) => {
    return (
      <span className="inline-flex px-2 py-1 bg-background-tertiary text-text-secondary rounded-md text-xs font-medium">
        {platform}
      </span>
    );
  };

  // Mobile card view
  const ReviewCard = ({ review, index }) => (
    <Card className="p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-tertiary">{review.date}</span>
          <RatingPill rating={review.rating} />
        </div>
        <PlatformPill platform={review.platform} />
      </div>
      
      <h4 className="font-medium text-text-primary mb-2">{review.title}</h4>
      <p className="text-sm text-text-secondary line-clamp-3">{review.review_text}</p>
    </Card>
  );

  // Desktop table view
  const TableView = () => (
    <div className="overflow-x-auto">
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-background-primary border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Platform
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reviews.slice(0, 10).map((review, index) => (
              <tr key={index} className="hover:bg-background-secondary transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-text-tertiary">
                  {review.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {renderStars(review.rating)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <PlatformPill platform={review.platform} />
                </td>
                <td className="px-4 py-3 text-sm text-text-primary max-w-xs">
                  <div className="truncate">{review.title}</div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary max-w-md">
                  <div className="truncate" title={review.review_text}>
                    {review.review_text}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reviews.length > 10 && (
        <div className="text-center mt-4 text-sm text-text-tertiary">
          Showing first 10 of {reviews.length} reviews
        </div>
      )}
    </div>
  );

  return (
    <section className="mb-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold tracking-tight mb-4">
          Parsed Reviews ({reviews.length})
        </h2>
        
        {/* Mobile: Card layout */}
        <div className="md:hidden">
          {reviews.slice(0, 10).map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
          {reviews.length > 10 && (
            <div className="text-center mt-4 text-sm text-text-tertiary">
              Showing first 10 of {reviews.length} reviews
            </div>
          )}
        </div>

        {/* Desktop: Table layout */}
        <div className="hidden md:block">
          <TableView />
        </div>
      </Card>
    </section>
  );
};

export default ReviewsTable;
