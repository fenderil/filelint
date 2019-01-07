const getConfig = require('./configuration')
const projectModel = require('./project-model')
const Reporter = require('./reporter')
const applyRule = require('./apply-rule')
const applyFix = require('./apply-fix')

module.exports = function ({
    configPath,
    target = '.',
    fix = false,
    quiet = false
} = {}) {
    // alive configuration with all callbacks for linting
    const config = getConfig(configPath, { quiet })

    // tree model of target project
    const model = projectModel(target, {
        ignore: config.ignore,
        config
    })
    const reporter = new Reporter()

    applyRule(model, config, reporter)

    if (fix) {
        applyFix(model, config, reporter)
    }

    reporter.print()
}
