export const themeReviews = async (reviews) => {
  try {
    const response = await fetch('/api/theme-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reviews }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Theme analysis failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Theme reviews API error:', error);
    throw error;
  }
}

export const generatePulse = async (themes) => {
  try {
    const response = await fetch('/api/generate-pulse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ themes }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Pulse generation failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Generate pulse API error:', error);
    throw error;
  }
}

export const createDraft = async (pulse) => {
  // TODO: Implement in Phase 4
  throw new Error('Not implemented yet')
}
