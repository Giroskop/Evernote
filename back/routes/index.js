const express = require('express');
const router = express.Router();
const User = require('../db/models/user')

/* GET home page. */
router.route('/')
.get( async (req, res) => {
  res.render('index', { title: 'Express' });
})

module.exports = router;
