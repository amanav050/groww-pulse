Groww Pulse

Turn 8 weeks of Groww app reviews into a one-page weekly pulse — with top themes, real user quotes, and three ready-to-ship action ideas — in under 60 seconds.

An AI-powered weekly review analyser built for product teams. Upload a CSV of recent app store reviews, let the model cluster them into actionable themes, generate a one-page pulse, and ship it to your team over email — all in four clicks.

Demo
🚀 Live demo: https://growwwpulse.vercel.app/
🎥 Walkthrough video: https://www.loom.com/share/892b7cf0a1b043deab661b8768f8332c

Why this exists
Product, growth, and support teams at consumer apps drown in review data. The Play Store + App Store drip in hundreds of qualitative signals per week — but nobody has time to read them. The two failure modes are:

Teams ignore them entirely and miss recurring pain points (like KYC rejections or failed SIPs).
One junior PM reads them manually and spends half a day writing a summary that gets skimmed in three minutes.

Groww Pulse solves this by doing what a PM would do, automatically:

Clustering reviews into the 5 most actionable themes
Ranking the top 3 by volume
Picking a representative quote for each
Generating 3 concrete action ideas a PM could ship this week
Drafting a clean email the team can actually read

The output is intentionally opinionated — not "users are unhappy," but "add an inline KYC status tracker with rejection reasons."

What it does
4-step flow, end-to-end:

Upload — drop a CSV of recent reviews (date, rating, title, text, platform)
Theme — AI clusters reviews into 5 actionable themes with sentiment + counts
Pulse — generates a one-page pulse (top 3 themes, quotes, 3 action ideas)
Email — opens a pre-filled Gmail compose window, ready to send to your team

Every output is strictly PII-free by design. No names, emails, or user IDs are ever included in themes, quotes, or pulse content.

Tech stack
LayerToolWhyFrontendReact 18 + ViteFast dev, Vercel-nativeStylingTailwind CSS + custom design tokensStripe-inspired aesthetic, dark/light modeBackendVercel Serverless FunctionsKeeps API keys server-side, one repoAIGroq SDK (Llama 3.3 70B) with JSON modeSub-second inference, free tier, deterministic JSON outputEmailDirect Gmail compose URLCross-platform, no OS dependencyCSV parsingPapaParseHandles ragged, real-world CSVsDeployVercelOne-click deploy, unified frontend + serverless

The Groq pivot — a PM note
The original architecture used Anthropic's Claude + Gmail MCP for a fully-automated draft creation flow (model directly orchestrates Gmail via Anthropic's Model Context Protocol). Mid-build, I pivoted to Groq (Llama 3.3 70B) + a direct Gmail compose URL due to API cost constraints on a portfolio project.
Key design choice to make the pivot reversible: response schemas and data contracts were kept identical. Both theme-reviews and generate-pulse endpoints return JSON that matches the original MCP-era spec exactly. In a production environment with Anthropic access, the provider can be swapped by changing two files (api/theme-reviews.js and api/generate-pulse.js) — no frontend changes required.
This is deliberately spelled out here because the ability to reason about cost vs. ideal-stack tradeoffs is part of the PM exercise this project was built for.

Key features

Locked JSON data contracts across two LLM calls, enforced via prompt rules + JSON mode
Strict "top 3 by review_count" ranking rule — reproducible, not subjectively-weighted
250-word cap on the pulse body, enforced in the prompt
PII-free by construction — CSV schema prevents name/email/ID fields
Stripe-inspired dark mode with aurora background + subtle dot grid, plus light mode toggle
Mobile-responsive — single-column on mobile, multi-column on desktop
Deterministic theming — same CSV + same prompt produces consistent clustering


Running locally
Prerequisites:

Node.js 20+
A free Groq API key (signup is 2 minutes, no card required)

Setup:
bash# clone and install
git clone https://github.com/amanav050/groww-pulse.git
cd groww-pulse
npm install

# add your Groq API key
echo "GROQ_API_KEY=gsk_your_key_here" > .env.local

# install Vercel CLI (for local serverless function support)
npm install -g vercel

# run the dev server
vercel dev
Open http://localhost:3000 — default view is dark mode. A sample CSV (public/sample_reviews.csv) is included for quick testing.

Re-running for a new week

Pull your latest reviews into a CSV matching the schema below (Appfigures, ReviewBot, AppFollow all export this shape)
Drop the CSV into the uploader
Click through the 4 steps — takes ~15 seconds end-to-end
Click "Open in Gmail" and send to your team

CSV schema:
ColumnTypeExampledateYYYY-MM-DD2025-04-18ratinginteger 1–52titlestring"App keeps crashing"review_textstring"Can't even open the SIP page..."platform"Play Store" or "App Store"Play Store

Theme legend
The AI is constrained to pick themes that are concrete and actionable for a product team. Typical themes for Groww-style apps:
ThemeWhat it coversKYC IssuesVerification failures, document rejections, status tracking gapsApp PerformanceCrashes, freezes, slow loading, memory issuesPayments & SIPFailed transactions, deduction without investment, NAV mismatchesCustomer SupportResponse times, ticket resolution, escalation pathsUser ExperienceNavigation, onboarding, feature discovery
Themes are re-clustered on every run — names may vary slightly week-to-week depending on review distribution.

Architecture
Detailed architecture doc: ARCHITECTURE.md
High-level flow:
CSV upload
   → PapaParse (client)
   → POST /api/theme-reviews (Groq call #1)
   → 5 themes JSON
   → POST /api/generate-pulse (Groq call #2)
   → pulse JSON
   → buildEmailBody(pulse) → Gmail compose URL
Directory layout:
groww-pulse/
├── api/                    # Vercel serverless functions
│   ├── theme-reviews.js
│   └── generate-pulse.js
├── src/
│   ├── components/         # UI components (Header, StepProgress, Step*, *View)
│   └── lib/                # api.js (fetch wrappers), prompts.js (LLM prompts)
├── public/
│   └── sample_reviews.csv  # Demo data
├── ARCHITECTURE.md
├── BUILD_LOG.md            # Phase-by-phase build journal
└── README.md

Known limitations & v2 ideas
Honest about what this is and isn't:

Review count doesn't always sum. Llama occasionally drops some reviews from clustering. Themes are directionally correct but counts don't always add to the total CSV row count. A v2 would add a reconciliation step or swap to a stricter clustering approach.
Ranking is count-based only. Top 3 are picked by review count, not sentiment weight. A large "positive" theme can outrank a critical "negative" theme with fewer reviews. Deliberate choice for reproducibility — v2 would add impact weighting.
Single-user, local-first. No auth, no team accounts, no historical pulse storage. A production version would add persistence + a "compare this week vs last week" view.
Gmail-only email handoff. Other mail clients (Outlook, Yahoo) aren't supported in v1. Fallback is the "Copy to Clipboard" button.
No scheduled runs. Currently manual. A production version would fetch reviews automatically via AppFigures/App Store Connect APIs on a weekly cron.


Context
Built as Milestone 2 of the Next Leap APM Fellowship — a hands-on product management program focused on shipping AI-powered tools end-to-end. Milestone 1 was a RAG-based mutual fund FAQ chatbot for Groww × SBI Mutual Fund; Milestone 2 (this project) focuses on turning qualitative review data into actionable product insights.
The goal of the fellowship is not to build throwaway demos — it's to reason about tradeoffs, data contracts, prompt design, and the full production stack a PM would need to own. This README is written in that spirit.

Credits
Built by Manav Agarwal — product-minded, early-career APM shipping AI tools for fintech and consumer apps.
LinkedIn: [add your LinkedIn URL here]
GitHub: @amanav050

License
MIT — do whatever. Attribution appreciated.