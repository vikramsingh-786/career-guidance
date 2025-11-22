// backend/controllers/skillGapController.js
const skillsData = require('../data/skillsData');

const analyzeSkillGap = (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    // Validation
    if (!targetRole || !currentSkills) {
      return res.status(400).json({ 
        error: 'Target role and current skills are required' 
      });
    }

    // Get required skills for the target role
    const requiredSkills = skillsData[targetRole];

    if (!requiredSkills) {
      return res.status(404).json({ 
        error: 'Target role not found',
        availableRoles: Object.keys(skillsData)
      });
    }

    // Normalize current skills (trim and lowercase)
    const normalizedCurrentSkills = currentSkills.map(skill => 
      skill.trim().toLowerCase()
    );

    // Calculate matched and missing skills
    const matchedSkills = requiredSkills.filter(skill => 
      normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(skill => 
      !normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    // Generate recommendations
    const recommendations = generateRecommendations(
      targetRole, 
      missingSkills, 
      matchedSkills.length
    );

    // Suggest learning order (prioritize foundational skills)
    const suggestedLearningOrder = getSuggestedLearningOrder(
      targetRole, 
      missingSkills
    );

    // Calculate completion percentage
    const completionPercentage = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );

    res.json({
      targetRole,
      totalRequiredSkills: requiredSkills.length,
      completionPercentage,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder
    });
  } catch (error) {
    console.error('Error in skill gap analysis:', error);
    res.status(500).json({ error: 'Failed to analyze skill gap' });
  }
};

// Helper function to generate recommendations
const generateRecommendations = (role, missingSkills, matchedCount) => {
  const recommendations = [];

  if (missingSkills.length === 0) {
    recommendations.push(`Congratulations! You have all the required skills for ${role}.`);
    recommendations.push('Consider building projects to strengthen your portfolio.');
    recommendations.push('Start applying for positions and prepare for interviews.');
  } else if (matchedCount === 0) {
    recommendations.push(`You're starting your journey to become a ${role}.`);
    recommendations.push('Focus on foundational skills first before moving to advanced topics.');
    recommendations.push('Consider taking structured courses or bootcamps.');
  } else {
    recommendations.push(`You're ${Math.round((matchedCount / (matchedCount + missingSkills.length)) * 100)}% ready for ${role}.`);
    recommendations.push(`Focus on learning: ${missingSkills.slice(0, 3).join(', ')}`);
    recommendations.push('Build small projects while learning each new skill.');
  }

  return recommendations;
};

// Helper function to suggest learning order
const getSuggestedLearningOrder = (role, missingSkills) => {
  const learningPriority = {
    'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    'Backend Developer': ['Java', 'Git', 'SQL', 'APIs', 'Spring Boot'],
    'Data Analyst': ['Excel', 'SQL', 'Statistics', 'Python', 'Dashboards']
  };

  const priority = learningPriority[role] || missingSkills;
  
  return missingSkills.sort((a, b) => {
    const indexA = priority.findIndex(skill => 
      skill.toLowerCase() === a.toLowerCase()
    );
    const indexB = priority.findIndex(skill => 
      skill.toLowerCase() === b.toLowerCase()
    );
    
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

module.exports = { analyzeSkillGap };