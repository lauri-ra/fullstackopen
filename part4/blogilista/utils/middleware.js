const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')

    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      request.token = auth.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {
    if(request.token) { 
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)

        request.user = user
    }
    else {
        return response.status(401).json({
            error: 'Token missing or invalid'
        })
    }

    next()
}
  
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}