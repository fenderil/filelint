const configGetter = require('./config-getter')
const projectModel = require('./project-model')
const Reporter = require('./reporter')
const applyRule = require('./apply-rule')

module.exports = function ({
    configPath,
    target = '.',
    fix = false,
    quiet = false,
    ignore = ['node_modules', '.git', '.idea']
} = {}) {
    const model = projectModel(target, {
        ignore
    })
    const config = configGetter(configPath)
    const reporter = new Reporter()

    applyRule(model, config, reporter)

    reporter.print()
}
