module.exports = {
    rule: function (model, options) {
        const { structure } = options

        if (model.isProjectRoot) {
            // TODO: compare project root with expected model
            // JSON-schema?
        }
    }
}
