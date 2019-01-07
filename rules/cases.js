const _ = require('lodash')

const caseMapping = {
    'kebab-case': _.kebabCase,
    'camelCase': _.camelCase,
    'snake_case': _.snakeCase,
    'PascalCase': (str) => _.upperFirst(_.camelCase(str))
}

module.exports = {
    rule: function (model, options = {}) {
        const expectedCase = options.case || 'kebab-case'

        if (caseMapping[expectedCase](model.name) !== model.name) {
            return { message: `File isn't in ${expectedCase}` }
        }
    }
}
