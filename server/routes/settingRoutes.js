const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../controllers/settingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSettings).post(protect, admin, updateSetting);

module.exports = router;
