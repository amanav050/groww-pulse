import ThemesView from './ThemesView';
import Button from './ui/Button';
import Card from './ui/Card';

const ThemeStep = ({ 
  reviews, 
  themes, 
  isGeneratingThemes, 
  themeError, 
  onGenerateThemes, 
  onThemeError 
}) => {
  return (
    <section className="mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight mb-2">
              Step 2: Generate Themes
            </h2>
            <p className="text-sm text-text-secondary">
              Analyze {reviews.length} reviews to identify key themes
            </p>
          </div>
          <Button
            onClick={onGenerateThemes}
            loading={isGeneratingThemes}
            disabled={isGeneratingThemes}
          >
            {isGeneratingThemes ? 'Analyzing...' : 'Generate Themes'}
          </Button>
        </div>
        
        {/* Theme-specific error */}
        {themeError && (
          <div className="bg-danger-subtle border border-danger text-danger px-4 py-3 rounded-lg mb-6">
            {themeError}
          </div>
        )}

        {/* Themes display */}
        <ThemesView
          themes={themes}
          isLoading={isGeneratingThemes}
          error={themeError}
        />
      </Card>
    </section>
  );
};

export default ThemeStep;
