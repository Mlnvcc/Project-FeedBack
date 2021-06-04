const FeedbackModel = require('../models/feedbackModel');
const TechnologyModel = require('../models/technologyModel');
const PositionModel = require('../models/vacancyModel');

const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.userId ? res.render('review') : res.redirect('user/signUp');
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

router.get("/:id/edit", async (req, res) => {
  if (req.session?.userName) {
    let review = await FeedbackModel.findById(req.params.id);
    res.render("editReview", { review });
  }
  return res.redirect("/user/signUp");
});


module.exports = router;
