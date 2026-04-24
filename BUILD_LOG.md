# Build Log

## Phase 1: Scaffold + CSV Upload + Display — April 23, 2026

### What was built
- **package.json** - Project dependencies and scripts for React 18 + Vite + Tailwind CSS setup
- **vite.config.js** - Vite configuration for React development server
- **tailwind.config.js** - Tailwind CSS configuration with custom color scheme
- **postcss.config.js** - PostCSS configuration for Tailwind processing
- **index.html** - Main HTML entry point with React root element
- **src/main.jsx** - React application entry point
- **src/index.css** - Tailwind CSS directives and base styles
- **src/App.jsx** - Main application component with stepper navigation and review display
- **src/components/CSVUploader.jsx** - CSV file upload component with parsing using PapaParse
- **src/lib/api.js** - API utility functions for backend communication
- **public/sample_reviews.csv** - Sample CSV file with 67 reviews for testing
- **.env.example** - Environment variable template
- **.gitignore** - Git ignore configuration
- **README.md** - Project documentation and setup instructions
- **ARCHITECTURE.md** - Detailed technical architecture and phase planning

### Key decisions
- **React 18 + Vite** for fast development and modern build tooling
- **Tailwind CSS** for utility-first styling without custom CSS files
- **PapaParse** for robust CSV parsing in the browser
- **Groq SDK** with llama-3.3-70b-versatile model for AI analysis (future phases)
- **Frontend-only mailto: links** for email handoff (Phase 4)
- **Stepper UI pattern** for clear phase progression
- **Component-based architecture** with separation of concerns
- **Environment variables** for API configuration (GROQ_API_KEY)
- **Plain JavaScript** instead of TypeScript for simplicity

### How to test
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser to the provided localhost URL
4. Click "Upload CSV" button and select `public/sample_reviews.csv`
5. Verify CSV parses and shows "67 reviews loaded successfully"
6. Click "Next" to proceed to step 2
7. Verify reviews are displayed in a scrollable list
8. Test stepper navigation between steps 1 and 2
9. Verify CSV data displays correctly with date, rating, title, and review text

### What's NOT yet built (intentionally)
- **Theming endpoint** - AI-powered theme extraction from reviews using Groq (Phase 2)
- **ThemesView component** - UI for displaying extracted themes (Phase 2)
- **Pulse endpoint** - Weekly pulse analysis using Groq (Phase 3)
- **PulseView component** - UI for pulse insights (Phase 3)
- **mailto handoff component** - Frontend-only email link generation (Phase 4)
- **EmailDraftButton component** - UI for mailto: links and clipboard copy (Phase 4)
- **Backend API routes** - Serverless functions on Vercel using Groq SDK (Phases 2-3)

### Known issues / TODOs
- **CSV parsing discrepancy**: Sample CSV contains 70 rows but only 67 reviews parsed - investigate in Phase 2
- **Error handling**: Add more robust error states for file upload failures
- **Loading states**: Improve loading indicators during CSV processing
- **Responsive design**: Optimize layout for mobile devices
- **Accessibility**: Add proper ARIA labels and keyboard navigation
- **Data validation**: Add CSV schema validation before processing

## Phase 2: Theming Endpoint + ThemesView — April 24, 2026

### What was built
- **api/theme-reviews.js** - Vercel serverless function with Groq SDK integration and JSON mode
- **src/lib/prompts.js** - THEMING_PROMPT with Groww-specific context and actionable theme rules
- **src/lib/api.js** - themeReviews function with error handling and API communication
- **src/components/ThemesView.jsx** - Theme cards component with sentiment indicators and loading states
- **src/App.jsx** - Theme generation logic, stepper transitions, and new state management

### Key decisions
- **Groq JSON mode**: Used response_format: { type: 'json_object' } for guaranteed valid JSON responses
- **Error handling**: Comprehensive try/catch with server-side logging and client-friendly error messages
- **Loading states**: Skeleton loading animation during theme analysis with user feedback
- **Sentiment visualization**: Color-coded badges (red/yellow/green) with emoji indicators
- **Responsive grid**: 1-3 column layout adapting from mobile to desktop screens
- **State isolation**: Separate themeError state to avoid conflicts with CSV upload errors

### How to test
1. Install dependencies: `npm install`
2. Install Vercel CLI: `npm install -g vercel`
3. Configure environment: Create .env.local with GROQ_API_KEY
4. Start Vercel dev server: `vercel dev`
5. Open browser to localhost:3000
6. Upload CSV file and verify "67 reviews loaded successfully"
7. Click "Generate Themes" button
8. Verify loading state shows "Analyzing..." with skeleton cards
9. Confirm 5 theme cards display with sentiment badges and sample reviews
10. Test error handling by uploading invalid CSV or with missing API key

### What's NOT yet built (intentionally)
- **Pulse endpoint** - Weekly pulse analysis using Groq (Phase 3)
- **PulseView component** - UI for pulse insights (Phase 3)
- **mailto handoff component** - Frontend-only email link generation (Phase 4)
- **EmailHandoff component** - UI for mailto: links and clipboard copy (Phase 4)
- **Backend API routes** - Pulse generation serverless function (Phase 3)

### Known issues / TODOs
- **Vercel CLI Windows issue**: Vercel CLI does not reliably load .env.local on Windows; we use a duplicate .env file as a workaround
- **PowerShell API testing**: PowerShell's Invoke-RestMethod cannot hit the local API due to Expect header incompatibility; use the browser for all manual testing
- **CSV parsing discrepancy**: Still investigating the 67 vs 70 review count discrepancy from Phase 1
- **Error handling**: Add more specific error messages for different failure scenarios
- **Performance**: Optimize Groq API call timeout and retry logic for larger datasets

## Phase 3: Pulse Endpoint + PulseView — April 24, 2026

### What was built
- **api/generate-pulse.js** - Vercel serverless function with date calculation and JSON.stringify themes substitution
- **src/lib/prompts.js** - PULSE_PROMPT with word limits, review_count ranking, and specific action ideas
- **src/lib/api.js** - generatePulse function with error handling and API communication
- **src/components/PulseView.jsx** - Pulse display component with theme cards and action ideas
- **src/App.jsx** - Pulse generation logic, stepper transitions, and new state management
- **src/components/UploadStep.jsx** - Step 1 wrapper component (19 lines)
- **src/components/ThemeStep.jsx** - Step 2 wrapper component (50 lines)
- **src/components/PulseStep.jsx** - Step 3 wrapper component (58 lines)
- **src/components/ReviewsTable.jsx** - Reviews display component (60 lines)

### Key decisions
- **Week range calculation**: JavaScript date arithmetic in serverless function for consistent formatting
- **JSON.stringify themes**: Full themes array with review_count for accurate top-3 selection
- **Strict review_count ranking**: Top themes sorted by review_count (not subjective impact) for reproducibility
- **Action idea specificity**: PM-focused, actionable suggestions vs generic improvements
- **Component refactor**: Split App.jsx (248 lines) into step components for maintainability
- **Props flow preservation**: All state remains in App.jsx as single source of truth

### How to test
1. Install dependencies: `npm install`
2. Install Vercel CLI: `npm install -g vercel`
3. Configure environment: Create .env.local with GROQ_API_KEY
4. Start Vercel dev server: `vercel dev`
5. Open browser to localhost:3000
6. Upload CSV file and verify "67 reviews loaded successfully"
7. Click "Generate Themes" and verify 5 theme cards display
8. Click "Generate Pulse" and verify loading state shows "Generating..."
9. Confirm pulse displays with week label, top 3 theme cards with quotes, and 3 action ideas
10. Test error handling with missing API key or invalid themes data

### What's NOT yet built (intentionally)
- **mailto handoff component** - Frontend-only email link generation (Phase 4)
- **EmailHandoff component** - UI for mailto: links and clipboard copy (Phase 4)
- **Backend API routes** - Email draft creation serverless function (Phase 4)

### Known issues / TODOs
- **Top-theme ranking**: Uses review_count as strict sort key, which can surface large positive themes above smaller but more critical negative ones. Intentional design choice (reproducibility > subjective impact weighting) — flagged for v2 consideration.
- **Vercel CLI Windows issue**: Vercel CLI does not reliably load .env.local on Windows; we use a duplicate .env file as a workaround
- **PowerShell API testing**: PowerShell's Invoke-RestMethod cannot hit the local API due to Expect header incompatibility; use the browser for all manual testing
- **CSV parsing discrepancy**: Still investigating the 67 vs 70 review count discrepancy from Phase 1

## Phase 4: Email Handoff (mailto + clipboard) — April 24, 2026

### What was built
- **src/components/EmailHandoff.jsx** - Email preview component with mailto and clipboard functionality (82 lines)
- **src/components/EmailStep.jsx** - Step 4 wrapper component following established pattern (25 lines)
- **src/App.jsx** - Email step integration and state management (136 lines)

### Key decisions
- **Email body DRY principle**: Single buildEmailBody(pulse) function consumed by preview, mailto, and clipboard
- **URL encoding**: Used encodeURIComponent on subject and body separately for proper mailto formatting
- **No default recipient**: mailto link leaves recipient blank so user chooses who to send to
- **State transition**: Stepper moves to 'drafted' when either button is clicked (mailto open OR clipboard copy)
- **Visual feedback**: "Copied!" confirmation shows for exactly 2 seconds using useState + setTimeout

### How to test
1. Install dependencies: `npm install`
2. Install Vercel CLI: `npm install -g vercel`
3. Configure environment: Create .env.local with GROQ_API_KEY
4. Start Vercel dev server: `vercel dev`
5. Open browser to localhost:3001
6. Upload CSV file and verify "67 reviews loaded successfully"
7. Click "Generate Themes" and verify 5 theme cards display
8. Click "Generate Pulse" and verify pulse displays with week label and themes
9. Click "Open in Gmail" and verify mail client opens with formatted email
10. Click "Copy to Clipboard" and verify "Copied!" confirmation appears for 2 seconds
11. Verify stepper transitions to 'drafted' state after either button click

### What's NOT yet built (intentionally)
- All planned features are complete - the application is fully functional end-to-end

### Known issues / TODOs
- **Mailto behavior**: Depends on user's OS default mail handler. On Windows without a default set, browser shows "Choose an app" dialog. This is OS-level behavior, not a bug in the app.
- **Top-theme ranking**: Uses review_count as strict sort key, which can surface large positive themes above smaller but more critical negative ones. Intentional design choice (reproducibility > subjective impact weighting) — flagged for v2 consideration.
- **Vercel CLI Windows issue**: Vercel CLI does not reliably load .env.local on Windows; we use a duplicate .env file as a workaround
- **PowerShell API testing**: PowerShell's Invoke-RestMethod cannot hit the local API due to Expect header incompatibility; use the browser for all manual testing
- **CSV parsing discrepancy**: Still investigating the 67 vs 70 review count discrepancy from Phase 1

 
 # #   U I   P o l i s h   P h a s e 
 
 # # #   W h a t   w a s   b u i l t 
 -   * * F u l l   S t r i p e - i n s p i r e d   d e s i g n   s y s t e m * *   v i a   C S S   v a r i a b l e s   i n   s r c / i n d e x . c s s 
 -   * * D a r k   m o d e   d e f a u l t * *   w i t h   l i g h t   m o d e   t o g g l e   ( c y c l e s   v i a   s u n / m o o n   i c o n   i n   h e a d e r ) 
 -   * * L e v e l   3   \  
 C i n e m a t i c \   d a r k   b a c k g r o u n d * * :   i n d i g o   +   v i o l e t   a u r o r a   g r a d i e n t s   i n   o p p o s i t e   c o r n e r s ,   s u b t l e   d o t   g r i d   p a t t e r n ,   r a d i a l   c e n t e r   d e p t h 
 -   * * S h a r e d   U I   p r i m i t i v e s * * :   B u t t o n ,   C a r d ,   S k e l e t o n   c o m p o n e n t s 
 -   * * H e a d e r   c o m p o n e n t * *   w i t h   w o r d m a r k   +   d a r k   m o d e   t o g g l e 
 -   * * S t e p P r o g r e s s   c o m p o n e n t * *   f o r   4 - s t e p   i n d i c a t o r 
 -   * * R e f a c t o r e d   A p p . j s x * *   t o   c o m p o s e   s t e p   c o m p o n e n t s   ( U p l o a d S t e p ,   T h e m e S t e p ,   P u l s e S t e p ,   E m a i l S t e p ) 
 -   * * P o l i s h e d   T h e m e s V i e w ,   P u l s e V i e w ,   E m a i l H a n d o f f * *   w i t h   n e w   d e s i g n   t o k e n s 
 -   * * M o b i l e - r e s p o n s i v e * *   a c r o s s   a l l   b r e a k p o i n t s 
 
 # # #   K e y   d e c i s i o n s 
 -   * * C h o s e   S t r i p e - i n s p i r e d   a e s t h e t i c * *   f o r   f i n t e c h   c r e d i b i l i t y   ( v s .   L i n e a r   d a r k - f i r s t   o r   N o t i o n   m i n i m a l ) 
 -   * * L o c k e d   d o t   g r i d   +   a u r o r a   b a c k g r o u n d * *   b e h i n d   ! i m p o r t a n t   n u c l e a r   s e l e c t o r   t o   e n s u r e   i t   o v e r r i d e s   T a i l w i n d   u t i l i t y   b g   c l a s s e s   o n   a n y   n e s t e d   d i v 
 -   * * D a r k   m o d e   s e t   a s   d e f a u l t * *   o n   f i r s t   l o a d      l i g h t   m o d e   a c c e s s i b l e   v i a   t o g g l e ,   p e r s i s t e d   i n   l o c a l S t o r a g e 
 -   * * G m a i l   c o m p o s e   U R L * *   r e p l a c e d   m a i l t o :   f o r   c r o s s - p l a t f o r m   r e l i a b i l i t y   ( m a i l t o   d e p e n d s   o n   O S   d e f a u l t   m a i l   h a n d l e r   w h i c h   i s   o f t e n   u n c o n f i g u r e d   o n   W i n d o w s ) 
 -   * * R e m o v e d   d u p l i c a t e   w e e k   h e a d e r * *   f r o m   e m a i l   b o d y   ( G m a i l   s u b j e c t   a l r e a d y   s h o w s   i t ) 
 
 # # #   H o w   t o   t e s t 
 -   * * O p e n   l o c a l h o s t : 3 0 0 0 * *   v i a   v e r c e l   d e v 
 -   * * D e f a u l t   v i e w * *   s h o u l d   b e   d a r k   m o d e   w i t h   a u r o r a   g l o w   +   d o t   g r i d 
 -   * * T o g g l e   t o   l i g h t   m o d e * *   v i a   s u n / m o o n   i c o n   i n   h e a d e r      s h o u l d   b e   c l e a n   S t r i p e - w h i t e 
 -   * * F u l l   f l o w   r e g r e s s i o n * * :   U p l o a d   C S V   �!  G e n e r a t e   T h e m e s   ( 5   c a r d s )   �!  G e n e r a t e   P u l s e   ( t o p   3   +   a c t i o n s )   �!  O p e n   i n   G m a i l   ( o p e n s   m a i l . g o o g l e . c o m   c o m p o s e   w i t h   p u l s e   p r e - f i l l e d ) 
 
 # # #   W h a t ' s   N O T   y e t   b u i l t   ( i n t e n t i o n a l l y ) 
 -   * * N o   P D F   e x p o r t * *   f o r   p u l s e   ( u s e r   u s e s   b r o w s e r   p r i n t - t o - P D F ) 
 -   * * N o   l i v e   d e p l o y m e n t * *      r u n s   l o c a l   o n l y   f o r   n o w ,   w i l l   b e   d e p l o y e d   t o   V e r c e l   p r o d u c t i o n   n e x t 
 -   * * N o   R E A D M E   p o l i s h * *      c u r r e n t l y   s t u b ,   w i l l   b e   w r i t t e n   n e x t 
 
 # # #   K n o w n   i s s u e s   /   T O D O s 
 -   * * A l l   V e r c e l   C L I   /   e n v   v a r   w o r k a r o u n d s * *   f r o m   P h a s e   2   s t i l l   a p p l y 
 -   * * g r o w w p u l s e   V e r c e l   p r o j e c t * *   ( n e w   l i n k e d   n a m e )   i s   s e p a r a t e   f r o m   e a r l i e r   g r o w w - p u l s e      m a y   w a n t   t o   c l e a n   u p   u n u s e d   V e r c e l   d a s h b o a r d   e n t r i e s   l a t e r 
 -   * * R e v i e w   c o u n t   d i s c r e p a n c i e s * *   ( 6 7   C S V   r o w s ,   ~ 4 0   r e v i e w s   c l u s t e r e d )   f r o m   P h a s e s   1 - 2   u n c h a n g e d 
  
 