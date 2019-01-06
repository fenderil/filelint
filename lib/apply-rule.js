function applyRule (model, config, reporter) {
    config.rules.forEach((rule) => {
        const message = rule.rule(model, rule.configuration.options)
        const fixable = !!rule.fix

        if (message) {
            const severity = rule.configuration.severity || rule.configuration

            if (severity === 'error' || severity === 2) {
                reporter.error(model.absolutePath, rule.name, message, fixable)
            }

            if (severity === 'warning' || severity === 1) {
                reporter.warning(model.absolutePath, rule.name, message, fixable)
            }
        }
    })

    if (model.children) {
        model.children.forEach((childModel) => {
            applyRule(childModel, config, reporter)
        })
    }
}

module.exports = applyRule
