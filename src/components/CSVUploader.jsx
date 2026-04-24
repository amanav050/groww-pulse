import { useState } from 'react'
import Papa from 'papaparse'
import { Upload, FileText } from 'lucide-react'
import Button from './ui/Button'

function CSVUploader({ onReviewsUpload, onError }) {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState('')

  const validateSchema = (data) => {
    if (!data || data.length === 0) {
      throw new Error('CSV file is empty')
    }

    const requiredColumns = ['date', 'rating', 'title', 'review_text', 'platform']
    const headers = Object.keys(data[0])
    
    const missingColumns = requiredColumns.filter(col => !headers.includes(col))
    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(', ')}`)
    }

    // Validate each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      
      // Check required fields
      if (!row.date || !row.rating || !row.title || !row.review_text || !row.platform) {
        throw new Error(`Row ${i + 1}: Missing required field(s)`)
      }

      // Validate rating is 1-5
      const rating = parseInt(row.rating)
      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error(`Row ${i + 1}: Rating must be between 1 and 5`)
      }

      // Validate platform
      if (!['Play Store', 'App Store'].includes(row.platform)) {
        throw new Error(`Row ${i + 1}: Platform must be "Play Store" or "App Store"`)
      }

      // Validate date format (basic YYYY-MM-DD check)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(row.date)) {
        throw new Error(`Row ${i + 1}: Date must be in YYYY-MM-DD format`)
      }
    }

    return true
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      onError('Please select a CSV file')
      return
    }

    setIsLoading(true)
    setFileName(file.name)
    onError('')

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          validateSchema(results.data)
          onReviewsUpload(results.data)
        } catch (error) {
          onError(error.message)
          setFileName('')
        } finally {
          setIsLoading(false)
        }
      },
      error: (error) => {
        onError('Could not read CSV file')
        setIsLoading(false)
        setFileName('')
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background-tertiary hover:bg-background-secondary transition-colors">
          <input 
            type="file" 
            className="hidden" 
            accept=".csv"
            onChange={handleFileSelect}
            disabled={isLoading}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isLoading ? (
              <div className="text-text-secondary flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Processing...</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-4 text-text-tertiary" />
                <p className="mb-2 text-sm text-text-secondary">
                  <span className="font-medium">Click to upload</span> CSV file
                </p>
                <p className="text-xs text-text-tertiary">
                  CSV with columns: date, rating, title, review_text, platform
                </p>
              </>
            )}
          </div>
        </label>
      </div>
      
      {fileName && !isLoading && (
        <div className="flex items-center gap-2 text-sm text-success p-3 bg-success-subtle rounded-lg">
          <FileText className="w-4 h-4" />
          <span>Loaded: {fileName}</span>
        </div>
      )}
    </div>
  )
}

export default CSVUploader
