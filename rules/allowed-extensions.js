const defaultExtensions = [
    '.js',
    '.jsx',
    '.ts',
    '.css',
    '.html',
    '.scss',
    '.json',
    '.svg',
    '.png'
]

module.exports = {
    rule: function (model, options = {}) {
        const extensions = options.extensions || defaultExtensions

        if (model.file && model.ext && !extensions.includes(model.ext)) {
            return { message: 'File with not allowed extension' }
        }
    }
}
