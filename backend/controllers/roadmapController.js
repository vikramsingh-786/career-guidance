// backend/controllers/roadmapController.js
const roadmapData = require('../data/roadmapData');

const generateRoadmap = (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({ 
        error: 'Target role is required' 
      });
    }

    const roadmap = roadmapData[targetRole];

    if (!roadmap) {
      return res.status(404).json({ 
        error: 'Roadmap not found for this role',
        availableRoles: Object.keys(roadmapData)
      });
    }

    res.json({
      targetRole,
      roadmap,
      totalDuration: roadmap.reduce((sum, phase) => 
        sum + parseInt(phase.duration), 0
      ),
      estimatedCompletion: `${roadmap.reduce((sum, phase) => 
        sum + parseInt(phase.duration), 0
      )} months`
    });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};

module.exports = { generateRoadmap };