const fs = require('fs')
const path = require('path')

const _ = require('lodash')
const { sync: locatePath } = require('locate-path')

const rules = require('../rules')

const defaultConfig = require('./default-config.json')

// TODO: support of "extends" config option
// TODO: support of "plugins" config option

const materialize = (config, rules) => ({
    ...config,
    rules: Object.keys(config.rules).map((name) => ({
        ...rules[name],
        configuration: config.rules[name],
        name
    }))
})

module.exports = (configPath) => {
    if (configPath) {
        return materialize(path.resolve(configPath), rules)
    }

    const packageJsonPath = path.join(process.cwd(), 'package.json')

    // check package.json

    if (fs.existsSync(packageJsonPath)) {
        const packageJson = require(packageJsonPath)

        if (packageJson.fslint) {
            return materialize(packageJson.fslint, rules)
        }
    }

    // check config files
    const actualConfigPath = locatePath([
        path.resolve('.fslintrc.js'),
        path.resolve('.fslintrc.json'),
        path.resolve('.fslintrc'),
    ])

    // get default if no config
    if (!actualConfigPath) {
        return materialize(defaultConfig, rules)
    }

    const config = !path.extname(actualConfigPath)
        ? JSON.parse(fs.readFileSync(actualConfigPath, 'utf8'))
        : require(actualConfigPath)

    return materialize(_.merge(defaultConfig, config), rules)
}
