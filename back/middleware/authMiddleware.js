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
  // try {
    console.log('должен декодировать токен')
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log('декод токен-----', decoded)
    req.user = decoded
    next()
  // } catch (e) {
  //   return next(ApiError.unauthorized('Токен не действителен'))
  // }
}
module.exports = auth
