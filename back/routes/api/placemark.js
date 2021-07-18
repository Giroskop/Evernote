const router = require('express').Router()
const placemarkController = require('../../controllers/placemarkController')
const imageMiddleware = require('../../middleware/multerMiddleware')
/* GET home page. */
router
	.route('/')
	.get(placemarkController.get)
	.post(imageMiddleware.single('placemarkImage'), placemarkController.create)
  .patch(imageMiddleware.single('placemarkImage'), placemarkController.update)
	.delete(placemarkController.delete)

router
	.route('/:id')
	.get(placemarkController.getOne)
module.exports = router
