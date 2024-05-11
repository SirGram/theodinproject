const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('event', ()=>console.log('Event fired'))
myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')

const Logger = require('./logger')

const logger = new Logger()

logger.on('message', data=> console.log('called listener ', data))

logger.log('hello')