const _ = require('lodash')

// kebab-case, camelCase, PascalCase, sneak_case, ...etc
const caseMapping = {
    'kebab-case': _.kebabCase,
    'camelCase': _.camelCase
}

module.exports = function (relativePath, absolutePath, collection, options) {
    const expectedCase = (options || {}).case || 'kebab-case'

    const fileName = relativePath.split('/').pop().split('.')[0]

    if (caseMapping[expectedCase](fileName) !== fileName) {
        return 'File "' + absolutePath + '" isn\'t in ' + expectedCase
    }

    return void ''
}


module.exports.fix = function () {
    // TODO: rename (from deeper to upper)
}
