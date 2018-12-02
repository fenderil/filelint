const fs = require('fs')

module.exports = function (relativePath, absolutePath) {
    if (fs.lstatSync(absolutePath).isDirectory() && !fs.readdirSync(absolutePath).length) {
        return 'Directory "' + absolutePath + '" is empty'
    }
}

module.exports.fix = function (absolutePath) {
    fs.rmdir(absolutePath)
}
