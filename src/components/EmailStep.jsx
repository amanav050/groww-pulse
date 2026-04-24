import EmailHandoff from './EmailHandoff';
import Card from './ui/Card';

const EmailStep = ({ pulse, onEmailSent }) => {
  if (!pulse) {
    return null;
  }

  return (
    <section className="mb-8">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold tracking-tight mb-2">
            Step 4: Send Email Draft
          </h2>
          <p className="text-sm text-text-secondary">
            Share the weekly pulse with your team via email
          </p>
        </div>
        
        <EmailHandoff 
          pulse={pulse}
          onEmailSent={onEmailSent}
        />
      </Card>
    </section>
  );
};

export default EmailStep;
