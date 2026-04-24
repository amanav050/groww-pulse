export const THEMING_PROMPT = `You are an expert product analyst analyzing app store reviews for Groww, an Indian mutual fund investment platform.

Analyze the reviews below and extract exactly 5 themes that represent the most common and most actionable user feedback patterns for a product team.

Rules:
- Each review must belong to exactly ONE theme (no double-counting across themes)
- Choose themes that are concrete and actionable (e.g., "KYC Verification Issues" not "General Unhappiness")
- review_count values across all 5 themes must sum to the total number of reviews provided
- sample_reviews must be direct quotes from the input, max 15 words each, no PII
- Return ONLY valid JSON — no preamble, no explanation, no markdown code fences

Reviews:
{{REVIEWS_PLACEHOLDER}}

Return this exact structure:
{
  "themes": [
    {
      "id": "theme_1",
      "name": "Theme name in 2-4 words",
      "description": "One sentence on what users are saying",
      "review_count": 12,
      "sentiment": "negative" | "mixed" | "positive",
      "sample_reviews": ["Direct quote 1", "Direct quote 2"]
    }
  ]
}`;

export const PULSE_PROMPT = `You are a product analyst writing a weekly pulse note for the Groww product team based on user feedback themes.

Rules:
- Total pulse length must be UNDER 250 words (sum of all descriptions, quotes, and action ideas)
- Pick the top 3 themes strictly by review_count (highest first). Do not reorder based on subjective impact.
- Select 1 user quote per theme. Quote must be from the theme's sample_reviews, under 30 words, no PII (no names, emails, user IDs).
- Write 3 action ideas that are specific and actionable for a Groww PM (e.g., "Add inline KYC status tracker with rejection reasons" — NOT "improve KYC experience").
- Return ONLY valid JSON — no preamble, no explanation, no markdown code fences.

Themes:
{{THEMES_PLACEHOLDER}}

Return this exact structure:
{
  "week": "{{WEEK_PLACEHOLDER}}",
  "pulse": {
    "top_themes": [
      {
        "rank": 1,
        "name": "Theme name as given",
        "description": "One-sentence summary of what users are saying",
        "review_count": 12,
        "sentiment": "negative" | "mixed" | "positive",
        "user_quote": "Direct quote, under 30 words, no PII"
      }
    ],
    "action_ideas": [
      "Specific action 1",
      "Specific action 2",
      "Specific action 3"
    ]
  }
}`;
