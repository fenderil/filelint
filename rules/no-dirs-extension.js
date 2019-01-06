module.exports = {
    rule: function (model) {
        if (model.directory && model.ext) {
            return 'Directory is with extension'
        }
    }
}
