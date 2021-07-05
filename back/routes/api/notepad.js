const router = require('express').Router()
const notepadController = require('../../controllers/notepadController')
const imageMiddleware = require('../../middleware/multerMiddleware')

router
	.route('/')
	.get(notepadController.getAll)
	.post(imageMiddleware.single('placemarkImage'), notepadController.create)
	.delete(notepadController.delete)

router.route('/:id').get(notepadController.getOne)

module.exports = router
