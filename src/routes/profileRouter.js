const { Router } = require('express');
const { protectProfile } = require('../middleware/middleware');
const FeedBack = require('../models/feedbackModel');
const PositionModel = require('../models/vacancyModel');
const TechnologyModel = require('../models/technologyModel')

const router = Router();

router.route('/')
  .get(protectProfile, async (req, res) => {
    const userFeedBacks = await FeedBack.find({ author: req.session.userId }).populate('positionName').populate('technologies');
    res.render('profile', { userFeedBacks });
  });

router.route('/feedbacks/:id')
  .get(protectProfile, async (req, res) => {
    try {
      const selectedFeedBack = await FeedBack.findById(req.params.id).populate('positionName').populate('technologies');
      res.render('editReview', { selectedFeedBack });
    } catch (error) {
      console.error(error.message);
    }
  })
  .patch(async (req, res) => {
    const {
      comments,
      company,
      dateOfInterview,
      generalquestions,
      locationOfCompany,
      positionName,
      technologies,
      techquestions,
    } = req.body;
    try {
      const selectedFeedBack = await FeedBack.findByIdAndUpdate(req.params.id,
        {
          company,
          dateOfInterview,
          comments,
          locationOfCompany,
          techquestions,
          generalquestions,
        }, { new: true });

      await PositionModel.findByIdAndUpdate(selectedFeedBack.positionName, { name: positionName }, { new: true });
      await TechnologyModel.findByIdAndUpdate(selectedFeedBack.technologies, { name: technologies }, { new: true });
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
    }
  })
  .delete(protectProfile, async (req, res) => {
    try {
      await FeedBack.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
    }
  });

module.exports = router;
