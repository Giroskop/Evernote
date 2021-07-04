const multer = require('multer')
const {nanoid} = require('nanoid')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/notepads/')
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
const upload = multer({ storage: storage, fileFilter: fileFilter })

const notepadImage = upload.single('notepadImage')
module.exports = { notepadImage }















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
