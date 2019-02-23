/*
Result of parsing:
{
    "rules": [
        {
            "name": "rule-name",
            "rule": () => ({ message: 'error' }),
            "fix": () => exec('rm -rf /'),
            "severity": "error|warning|off",
            "options": { "case": "kebab-case", ... }
        },
        { ... },
        ...
    ],
    ...
}
*/

const severityErrors = ['error', 2]
const severityWarnings = ['warning', 'warn', 1]
const severityNothings = ['off', 0]

const modifySeverity = (rules) => rules

module.exports = (fslintConfig) => ({
    ...fslintConfig,
    rules: modifySeverity(fslintConfig.rules)
})
