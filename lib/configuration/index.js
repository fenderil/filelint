const builder = require('./builder')
const getter = require('./getter')
const parser = require('./parser')

module.exports = (path, fslintParams) => parser(builder(getter(path), fslintParams))

// 1. Get all extends
// 2. Get all plugins from all extends
// 3. Merge
// 4. Parse
// 5. Filter (off and quiet warn rules)
// 6. Attach callbacks
