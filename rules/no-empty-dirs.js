module.exports = {
    rule: function (model) {
        if (model.directory && !(model.children && model.children.length)) {
            return { message: 'Directory is empty' }
        }
    }
}
