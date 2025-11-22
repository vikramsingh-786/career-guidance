const express = require('express');
const router = express.Router();
const { analyzeSkillGap } = require('../controllers/skillGapController');

router.post('/skill-gap', analyzeSkillGap);

module.exports = router;