const ApiError = require('../error/ApiError')

function apiErrorMiddleware(err,req,res,next) {
  if (err instanceof ApiError) {
    console.log('FROM APIERRORHANDLER')
    return res.status(err.status).json(err.message)
  }
  console.log('just error-------------')
  return res.status(500).json("Непредвиденная ошибка!")
}

module.exports = apiErrorMiddleware
