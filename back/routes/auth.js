const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

/* GET home page. */
router.route('/:authPage').post(async (req, res) => {
	if (req.params.authPage === 'signUp') {
		const { firstName, lastName, email, password } = req.body
		if (email && password) {
			if (await User.findOne({ email: email })) {
				// Ошибка: такой юзер уже зарегистрирован - запрет регистрации
        return res.sendStatus(406)
			} else {
				// Что лучше? Сделать unique поле в базе данных - тогда при регистрации мы будем попадать в catch (но что если будут другие ошибки) или проверять здесь, предварительно делая поиск в бд?
				try {
					const passwordHash = await bcrypt.hash(password, saltRounds)
					const newUser = await User.create({
						name: {
							firstName: firstName,
							lastName: lastName,
						},
						email: email,
						password: passwordHash,
					})
          return res.status(200).json(newUser)
				} catch (err) {
					// Ошибка: при записи в базу данных
          res.json(err)
				}
			}
		} else {
			// Ошибка: не все поля заполнены
      return res.sendStatus(400)
		}
	} else if (req.params.authPage === 'signIn') {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email: email })
			if (user && bcrypt.compare(password, user.password)) {
        req.session.userId = user._id
				return res.sendStatus(202)
			}
		} catch (err) {
			// Ошибка: при поиске в базе данных
		}
	} else if (req.params.authPage === 'logOut') {
    req.session.destroy()
    res.sendStatus(205)
		// Удаление сессии и редирект
	} else {
		// Ошибка: что будет, если адрес '/auth/[any param]' не прописан в обработчике post
	}
})

module.exports = router
