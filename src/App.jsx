import { useState } from 'react'
import Header from './components/Header'
import StepProgress from './components/StepProgress'
import UploadStep from './components/UploadStep'
import ThemeStep from './components/ThemeStep'
import PulseStep from './components/PulseStep'
import EmailStep from './components/EmailStep'
import ReviewsTable from './components/ReviewsTable'
import { themeReviews, generatePulse } from './lib/api'

function App() {
  const [step, setStep] = useState('idle') // idle → themed → pulsed → drafted
  const [reviews, setReviews] = useState([])
  const [themes, setThemes] = useState([])
  const [pulse, setPulse] = useState(null)
  const [error, setError] = useState('')
  const [isGeneratingThemes, setIsGeneratingThemes] = useState(false)
  const [themeError, setThemeError] = useState('')
  const [isGeneratingPulse, setIsGeneratingPulse] = useState(false)
  const [pulseError, setPulseError] = useState('')

  const handleReviewsUpload = (parsedReviews) => {
    setReviews(parsedReviews)
    setError('')
    setThemeError('')
    setThemes([])
    setStep('idle') // Reset to idle state
  }

  const handleGenerateThemes = async () => {
    if (!reviews.length) {
      setThemeError('Please upload reviews first')
      return
    }

    setIsGeneratingThemes(true)
    setThemeError('')
    setError('')

    try {
      const result = await themeReviews(reviews)
      setThemes(result.themes)
      setStep('themed')
    } catch (err) {
      setThemeError(err.message || 'Failed to generate themes')
    } finally {
      setIsGeneratingThemes(false)
    }
  }

  const handleThemeError = (errorMessage) => {
    setThemeError(errorMessage)
  }

  const handleGeneratePulse = async () => {
    if (!themes.length) {
      setPulseError('Please generate themes first')
      return
    }

    setIsGeneratingPulse(true)
    setPulseError('')
    setError('')

    try {
      const result = await generatePulse(themes)
      setPulse(result)
      setStep('pulsed')
    } catch (err) {
      setPulseError(err.message || 'Failed to generate pulse')
    } finally {
      setIsGeneratingPulse(false)
    }
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
  }

  const handleEmailSent = () => {
    setStep('drafted')
  }

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <StepProgress currentStep={step} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-danger-subtle border border-danger text-danger px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Step 1: CSV Upload */}
        <UploadStep 
          onReviewsUpload={handleReviewsUpload}
          onError={handleError}
        />

        {/* Reviews Table - Phase 1 only */}
        <ReviewsTable reviews={reviews} />

        {/* Step 2: Generate Themes */}
        {reviews.length > 0 && (
          <ThemeStep
            reviews={reviews}
            themes={themes}
            isGeneratingThemes={isGeneratingThemes}
            themeError={themeError}
            onGenerateThemes={handleGenerateThemes}
            onThemeError={handleThemeError}
          />
        )}

        {/* Step 3: Generate Pulse */}
        <PulseStep
          step={step}
          themes={themes}
          pulse={pulse}
          isGeneratingPulse={isGeneratingPulse}
          pulseError={pulseError}
          onGeneratePulse={handleGeneratePulse}
        />

        {/* Step 4: Send Email Draft */}
        {step === 'pulsed' && (
          <EmailStep
            pulse={pulse}
            onEmailSent={handleEmailSent}
          />
        )}
      </main>
    </div>
  )
}

export default App
