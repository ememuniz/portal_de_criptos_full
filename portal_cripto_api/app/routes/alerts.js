var express = require('express');
var router = express.Router();
const Alert = require('../models/alert');
const authMiddleware = require('../middlewares/auth');

router.post('/add', authMiddleware, async (req, res) => {
  const { crypto, referenceValue, condition } = req.body;
  const userId = req.user._id;

  try {
    const newAlert = new Alert({ userId, crypto, referenceValue, condition });
    console.log('newAlert', newAlert);
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error adding alert', details: error.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const alerts = await Alert.find({ userId });
    res.status(200).json(alerts);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error getting alerts', details: error.message });
  }
});

router.put('/update/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { crypto, referenceValue, condition } = req.body;

  console.log('crypto', crypto);
  console.log('referenceValue', referenceValue);
  console.log('condition', condition);
  
  

  try {
    let updatedAlert = await Alert.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          crypto: crypto,
          referenceValue: referenceValue,
          condition: condition,
        }
      },
      { upsert: true, new: true },
    );
    res.status(200).json(updatedAlert);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating alert', details: error.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Alert.findByIdAndDelete(id);
    res.status(200).json({ message: 'Alert deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting alert', details: error.message });
  }
});

module.exports = router;
