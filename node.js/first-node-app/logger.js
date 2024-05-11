const EventsEmitter = require('events')
const uuid = require('uuid')


class Logger extends EventsEmitter{
    log(msg){
        //Call event
        this.emit('message', {id:uuid.v4(), msg})
    }
}
module.exports = Logger


