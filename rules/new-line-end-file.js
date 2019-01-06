const fs = require('fs')

module.exports = {
    rule: function (model) {
        if (model.file) {
            const body = fs.readFileSync(model.absolutePath, 'utf8')

            if (!body.endsWith('\n')) {
                return 'File doesn\'t end with new line'
            }
        }
    }
}
