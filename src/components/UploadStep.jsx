import CSVUploader from './CSVUploader';
import Card from './ui/Card';

const UploadStep = ({ onReviewsUpload, onError }) => {
  return (
    <section className="mb-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold tracking-tight mb-4">
          Step 1: Upload Review Data
        </h2>
        <CSVUploader 
          onReviewsUpload={onReviewsUpload}
          onError={onError}
        />
      </Card>
    </section>
  );
};

export default UploadStep;
