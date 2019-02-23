const chalk = require('chalk')

module.exports = class Reporter {
    constructor (fslintParams) {
        this.violations = []
        this.cli = fslintParams.cli
    }

    warning (path, rule, message, fixable) {
        this.violations.push({ path, rule, message, fixable, type: 'warning' })
    }

    error (path, rule, message, fixable) {
        this.violations.push({ path, rule, message, fixable, type: 'error' })
    }

    print () {
        // console
        this.violations.forEach(({ path, type, rule, message, fixable }) => {
            const format = `[${type}] (${rule}) ${path}: ${message}${fixable ? ' (fixable)' : ''}`
            if (type === 'error') {
                console.error(chalk.red(format))
            }
            if (type === 'warning') {
                console.warn(chalk.yellow(format))
            }
        })

        const errors = this.violations.filter(({ type }) => type === 'error')
        const warnings = this.violations.filter(({ type }) => type === 'warning')

        console.log(`Errors: ${errors.length}`)
        console.log(`Warnings: ${warnings.length}`)

        const fixableErrors = errors.filter(({ fixable }) => fixable)
        const fixableWarnings = warnings.filter(({ fixable }) => fixable)

        if (fixableErrors.length || fixableWarnings.length) {
            console.log(`${
                fixableErrors.length
            } errors and ${
                fixableWarnings.length
            } warnings can be fixed with flag '--fix'`)
        }

        if (this.cli) {
            process.exit(1)
        }
    }
}
