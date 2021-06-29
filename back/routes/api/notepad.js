const router = require('express').Router()
const notepadController = require('../../controllers/notepadController')

router.route('/').get(notepadController.getAll).post(notepadController.create)
router.route('/:id').get(notepadController.getOne).post().delete()

module.exports = router