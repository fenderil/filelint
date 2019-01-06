const fs = require('fs')

module.exports = {
    rule: function (model, { crlf = 'crlf' } = {}) {
        if (model.file) {
            const body = fs.readFileSync(model.absolutePath, 'utf8')

            // TODO: checking cr/lf
        }
    }
}
