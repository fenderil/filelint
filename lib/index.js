const path = require('path')

const glob = require('glob')

// TODO: get config with extensions
const config = require('../.fslintrc.json')

// TODO: merge
const defaultConfig = require('./default-config')

const rules = Object
    .keys(config.rules)
    .map(function (rule) {
        return {
            cb: require('../rules/' + rule),
            configuration: config.rules[rule]
        }
    })

// TODO: get target from command
const target = '.'

module.exports = function () {
    glob(target + '/**', function (err, files) {
        if (err) {
            throw err
        }

        const warnings = []
        const errors = []

        files
            .filter(function (filePath) {
                return filePath !== target && !filePath.startsWith(target + '/node_modules')
            })
            .forEach(function (relativePath) {
                const absolutePath = path.resolve(target, relativePath)

                rules.forEach(function (rule) {
                    const message = rule.cb(relativePath, absolutePath, files, rule.configuration.options)

                    // TODO: normal stats
                    if (message && rule.configuration.severity === 'warning') {
                        console.warn(message)
                        warnings.push(message)
                    } else if (message && rule.configuration.severity === 'error') {
                        console.error(message)
                        errors.push(message)
                    }
                })
            })

        if (warnings.length) {
            console.log('Warnings: ' + warnings.length)
        }

        if (errors.length) {
            console.log('Errors: ' + errors.length)
            throw new Error('fslint exited with errors')
        }
    })
}
