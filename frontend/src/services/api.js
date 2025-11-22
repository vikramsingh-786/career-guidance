const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const analyzeSkillGap = async (targetRole, currentSkills) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skill-gap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetRole,
        currentSkills,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze skill gap');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing skill gap:', error);
    throw error;
  }
};

export const generateRoadmap = async (targetRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetRole,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate roadmap');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};