const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/courses.:format?', courseController.getCourses);
router.get('/courses/:course.:format?', courseController.getCourse);

module.exports = router;
