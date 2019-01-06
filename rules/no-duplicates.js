const _ = require('lodash')

module.exports = {
    rule: function (model) {
        if (model.directory && model.children && model.children.length) {
            const uniqueChildrenCount = _.uniqBy(model.children, 'name').length

            if (uniqueChildrenCount !== model.children.length) {
                return 'Directory has duplicated children'
            }
        }
    }
}
