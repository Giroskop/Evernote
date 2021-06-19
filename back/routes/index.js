const express = require('express');
const router = express.Router();
const User = require('../db/models/user')

/* GET home page. */
router.route('/')
.get( async (req, res) => {
  const user = await User.find({email})
})
.post(async(req, res) => {
  const user = await User.find({email})
  res.json(user)
})

module.exports = router;
