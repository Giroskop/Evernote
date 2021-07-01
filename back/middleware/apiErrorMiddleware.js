const ApiError = require('../error/ApiError')

function apiErrorMiddleware(err,req,res,next) {
  if (err instanceof ApiError) {

    return res.status(err.status).json(err.message)
  }

  return res.status(500).json("Непредвиденная ошибка!")
}

module.exports = apiErrorMiddleware
