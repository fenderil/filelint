module.exports = {
    rule: function (model) {
        if (model.file && model.size === 0) {
            return { message: 'File is empty' }
        }
    }
}
