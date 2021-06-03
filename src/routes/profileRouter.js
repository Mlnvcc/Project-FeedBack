const { Router } = require('express');
const { protectProfile } = require('../middleware/middleware');

const router = Router();

router.route('/')
  .get(protectProfile, (req, res) => {
    res.render('profile');
  });

module.exports = router;
