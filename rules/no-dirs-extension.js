const fs = require('fs')

module.exports = function (relativePath, absolutePath) {
    if (fs.lstatSync(absolutePath).isDirectory() && relativePath.split('/').pop().includes('.')) {
        return 'Directory "' + absolutePath + '" is with extension'
    }
}
