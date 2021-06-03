const { Schema, model } = require('mongoose');

const feedbackSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  locationOfCompany: String,
  positionName: {
    type: Schema.Types.ObjectId,
    ref: 'Vacancy',
  },
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],
  date: {
    type: Date.toLocaleString('ru-RU'),
  },
  generalIssues: {
    type: String,
    required: true,
  },
  technicalIssues: {
    type: String,
    required: true,
  },
});

const FeedbackModel = model('Feedback', feedbackSchema);

module.exports = FeedbackModel;

