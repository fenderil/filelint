module.exports = {
    rule: function (model) {
        if (model.directory && !(model.children && model.children.length)) {
            return 'Directory is empty'
        }
    }
}
