const fs = require('fs')
const path = require('path')

const { sync: locatePath } = require('locate-path')

const defaultConfig = require('./default')

module.exports = (configPath) => {
    // get from configPath
    if (configPath) {
        return require(path.resolve(configPath))
    }

    // get from root config files with ext
    const extConfigPath = locatePath([
        path.resolve('.fslintrc.js'),
        path.resolve('.filesystemlintrc.js'),
        path.resolve('.filesystemlinterrc.js'),
        path.resolve('.fslintrc.json'),
        path.resolve('.filesystemlintrc.json'),
        path.resolve('.filesystemlinterrc.json')
    ])
    if (extConfigPath) {
        return require(extConfigPath)
    }

    // get from root config files with no ext
    const noExtConfigPath = locatePath([
        path.resolve('.fslintrc'),
        path.resolve('.filesystemlintrc'),
        path.resolve('.filesystemlinterrc')
    ])
    if (noExtConfigPath) {
        return JSON.parse(fs.readFileSync(noExtConfigPath, 'utf8'))
    }

    // get from package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = require(packageJsonPath)

        const packageConfig = packageJson.fslint
            || packageJson.filesystemlint
            || packageJson.filesystemlinter

        if (packageConfig) {
            return packageConfig
        }
    }

    // get default
    console.log('No filesystemlinter config found. Getting default.')
    return defaultConfig
}
