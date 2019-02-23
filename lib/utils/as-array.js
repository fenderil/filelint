module.exports = (param) => {
    if (typeof param === 'string') {
        return [param]
    }

    return param || []
}
