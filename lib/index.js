const getConfig = require('./configuration')
const treeModel = require('./tree-model')
const Reporter = require('./reporter')
const applyRule = require('./apply-rule')
const applyFix = require('./apply-fix')

module.exports = function (fslintParams = {}) {
    const {
        configPath,
        target = '.',
        fix = false
    } = fslintParams

    // alive configuration with all callbacks for linting
    const fslintConfig = getConfig(configPath, fslintParams)

    // tree model of target project
    const model = treeModel(target, fslintConfig)
    const reporter = new Reporter(fslintParams)

    applyRule(model, fslintConfig, reporter)

    if (fix) {
        applyFix(model, fslintConfig, reporter)
    }

    reporter.print()
}
