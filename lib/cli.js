const index = require('.')

module.exports = function () {
    const program = require('commander')

    program
        .version(require('../package.json').version)
        .option('-t, --target [path]', 'Relative path to target directory [default: .]', '.')
        // .option('-r, --report [types]', 'Comma separated reports', '')
        // .option('-f, --fix', 'Fix all fixable errors and warnings')
        // .option('-q, --quiet', 'Show only errors')
        .option('-c, --config [path]', 'Relative path to config. If no option passed, use default algorithm.')
        .parse(process.argv)

    index({
        target: program.target,
        fix: program.fix,
        quiet: program.quiet,
        configPath: program.config,
        cli: true
    })
}
