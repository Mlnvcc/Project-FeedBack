const FeedbackModel = require('../models/feedbackModel')

const router = require('express').Router();

router.get('/', async (req, res) => {
  const allFeedbacks = await FeedbackModel.find();
  res.render('index', { allFeedbacks });
});

module.exports = router;
