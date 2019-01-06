module.exports = {
    rule: function (model, { depth = 3 } = {}) {
        if (model.depth > depth) {
            return `Directory or file is deeper than allowed depth: ${depth}. Current depth: ${model.depth}`
        }
    }
}
