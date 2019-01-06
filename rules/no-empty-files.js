module.exports = {
    rule: function (model) {
        if (model.file && model.size === 0) {
            return 'File is empty'
        }
    }
}
