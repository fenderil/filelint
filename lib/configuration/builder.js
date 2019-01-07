const defaultMaterialRules = require('../../rules')

const asArray = (param) => {
    if (typeof param === 'string') {
        return [param]
    }

    return param || []
}

// TODO: split extending and enrichment
module.exports = (config, { quiet } = {}) => {
    // TODO: take recursively extends of extends
    // const configBase = asArray(config.extends).reduce((memo, extendsPath) => {
    //
    // }, [])

    const materialRules = asArray(config.plugins).reduce((memo, pluginPath) => ({
        ...memo,
        ...require(pluginPath)
    }), defaultMaterialRules)

    // TODO: replace to parsing
    let enrichmentRules = Object.keys(config.rules).map((name) => ({
        /* rule, fix, configuration, name */
        ...materialRules[name],
        configuration: config.rules[name],
        name
    }))

    // if (quiet) {
    //     enrichmentRules = enrichmentRules
    // }

    return {
        /* extends, plugins, overrides, ignore */
        ...config,
        rules: enrichmentRules
    }
}
