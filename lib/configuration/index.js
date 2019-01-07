const builder = require('./builder')
const getter = require('./getter')
const parser = require('./parser')

module.exports = (path, options) => parser(builder(getter(path), options))
