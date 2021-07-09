const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

async function auth(req, res, next) {
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS IN AUTH--------')
    next()
  }
  const token = req.header('x-auth-token')
  if (!token) {
    return next(ApiError.unauthorized('Не авторизован'))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    return next(ApiError.unauthorized('Токен не действителен'))
  }
}
module.exports = auth
