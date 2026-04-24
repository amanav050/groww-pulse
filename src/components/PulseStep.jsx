import PulseView from './PulseView';
import Button from './ui/Button';
import Card from './ui/Card';

const PulseStep = ({ 
  step, 
  themes, 
  pulse, 
  isGeneratingPulse, 
  pulseError, 
  onGeneratePulse 
}) => {
  if (step !== 'themed' && step !== 'pulsed') {
    return null;
  }

  return (
    <>
      {/* Step 3: Generate Pulse */}
      {step === 'themed' && (
        <section className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight mb-2">
                  Step 3: Generate Pulse
                </h2>
                <p className="text-sm text-text-secondary">
                  Create weekly pulse from {themes.length} themes
                </p>
              </div>
              <Button
                onClick={onGeneratePulse}
                loading={isGeneratingPulse}
                disabled={isGeneratingPulse}
              >
                {isGeneratingPulse ? 'Generating...' : 'Generate Pulse'}
              </Button>
            </div>
            
            {/* Pulse-specific error */}
            {pulseError && (
              <div className="bg-danger-subtle border border-danger text-danger px-4 py-3 rounded-lg">
                {pulseError}
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Pulse Display */}
      {step === 'pulsed' && pulse && (
        <PulseView pulse={pulse} />
      )}
    </>
  );
};

export default PulseStep;
