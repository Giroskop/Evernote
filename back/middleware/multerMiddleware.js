const multer = require('multer')
const {nanoid} = require('nanoid')
const ApiError = require('../error/ApiError')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
    if (file.fieldname === 'placemarkImage') {
      cb(null, 'public/images/placemarks/')
    } else if (file.fieldname === 'notepadImage') {
      cb(null, 'public/images/notepads/')
      console.log('in prop')
    } else {
      console.log('отсутствует путь в мультере')
    }
	},
	filename: function (req, file, cb) {
    const format = `.${file.originalname.split(".")[1]}`
    imageName = nanoid(10) + format
		cb(null, imageName)
	},
})
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/webp'
	) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
module.exports = multer({ storage: storage, fileFilter: fileFilter })

















// const test = multer({dest: './public/images/notepads/', fileFilter: (req, file, cb) => {
// 	if (
// 		file.mimetype === 'image/png' ||
// 		file.mimetype === 'image/jpeg' ||
// 		file.mimetype === 'image/webp'
// 	) {
// 		cb(null, true)
// 	} else {
// 		cb(null, false)
// 	}},
// }).single('notepadImage')
