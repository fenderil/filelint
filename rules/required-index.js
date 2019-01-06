const _ = require('lodash')

module.exports = {
    rule: function (model) {
        if (model.directory && model.children) {
            const index = _.find(model.children, (child) => child.base.startsWith('index.'))

            if (!index) {
                return 'Directory is without index file'
            }
        }
    }
}
