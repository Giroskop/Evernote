const router = require('express').Router()

const userRouter = require('./user')
const notepadRouter = require('./notepad')
const placemarkRouter = require('./placemark')
// const authRouter = require('./auth')

/* GET home page. */
router.use('/user', userRouter)
router.use('/notepad', notepadRouter)
router.use('/placemark', placemarkRouter)
// router.use('/auth', authRouter)

module.exports = router;
