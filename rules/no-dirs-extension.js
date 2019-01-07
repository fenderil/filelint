module.exports = {
    rule: function (model) {
        if (model.directory && model.ext) {
            return { message: 'Directory is with extension' }
        }
    }
}
