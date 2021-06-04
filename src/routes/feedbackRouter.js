const FeedbackModel = require('../models/feedbackModel');
const TechnologyModel = require('../models/technologyModel');
const PositionModel = require('../models/vacancyModel');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('review');
});

router.post('/', async (req, res) => {
  const {
    company,
    dateOfInterview,
    positionName,
    technologies,
    techquestions,
    generalquestions,
    locationOfCompany,
    comments,
  } = req.body;
  const newTechnologies = await TechnologyModel.create({ name: technologies });
  const newPositionName = await PositionModel.create({ name: positionName });
  const newFeedback = await FeedbackModel.create({
    company,
    dateOfInterview,
    comments,
    author: req.session.userId,
    locationOfCompany,
    positionName: newPositionName,
    technologies: newTechnologies,
    techquestions,
    generalquestions,
  });
  res.redirect('/');
});



module.exports = router;
