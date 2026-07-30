const Setting = require('../models/Setting');

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find({});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSetting = async (req, res) => {
  const { key, value } = req.body;
  try {
    let setting = await Setting.findOne({ key });
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSettings, updateSetting };
