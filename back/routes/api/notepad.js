const router = require('express').Router()
const notepadController = require('../../controllers/notepadController')
const { notepadImage, test } = require('../../middleware/multerMiddleware')



router.route('/')
.get(notepadController.getAll)
.post(notepadImage, notepadController.create)
.delete(notepadController.delete)

router.route('/:id').get(notepadController.getOne).post().delete()

module.exports = router
