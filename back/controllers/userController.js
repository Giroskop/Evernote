const ApiError = require('../error/ApiError')
const User = require('../db/models/user')
const Notepad = require('../db/models/notepad')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateJWT(user) {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: 360000 }
	)
}

class UserController {
	async registration(req, res, next) {
		const { firstName, lastName, email, password } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Некорректный email или password'))
		}
		const isUser = await User.findOne({ email: email })
		if (isUser) {
			return next(
				ApiError.badRequest('Пользователь с таким email уже существует')
			)
		}
		const passwordHash = await bcrypt.hash(
			password,
			Number(process.env.SALTROUNDS)
		)
		const user = await User.create({
			name: {
				firstName: firstName,
				lastName: lastName,
			},
			email: email,
			password: passwordHash,
			created: Date.now(),
		})
		await Notepad.create({
			name: 'MyFirstNotepad',
      image: 'public/default/notepadImage.webp',
			author: user._id,
			created: Date.now(),
		})
		const token = generateJWT(user)
    return res.status(201).json({ token, user })
	}
	async login(req, res, next) {
    const { email, password } = req.body
		if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
		}
		const user = await User.findOne({ email: email })
		if (!user) {
      return next(ApiError.internal('Пользователь с такими данными не найден'))
		}
		const comparePassword = await bcrypt.compare(password, user.password)
		if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
		}
    const token = generateJWT(user)
    return res.status(200).json({ token, user })
	}
	async auth(req, res, next) {
    const user = await User.findById(req.user.id).select('-password')

		return res.json(user)
	}
}
module.exports = new UserController()
