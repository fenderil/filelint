function applyRule (model, fslintConfig, reporter) {
    fslintConfig.rules.forEach((rule) => {
        const ruleResult = rule.rule(model, rule.configuration.options)
        const fixable = Boolean(rule.fix)

        if (ruleResult && ruleResult.message) {
            const { message } = ruleResult
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
            applyRule(childModel, fslintConfig, reporter)
        })
    }
}

module.exports = applyRule
