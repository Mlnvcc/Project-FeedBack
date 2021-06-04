const { Router } = require('express');
const { protectProfile } = require('../middleware/middleware');
const FeedBack = require('../models/feedbackModel');

const router = Router();

router.route('/')
  .get(protectProfile, async (req, res) => {
    const userFeedBacks = await FeedBack.find({ author: req.session.userId }).populate('positionName').populate('technologies');
    console.log(userFeedBacks);
    res.render('profile', { userFeedBacks });
  });

module.exports = router;
