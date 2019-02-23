const fs = require('fs')
const path = require('path')

function treeModel (target, fslintConfig, {
    parent,
    depth = 0,
    projectRoot = target,
} = {}) {
    const {
        ignore = ['node_modules', '.git', '.idea']
    } = fslintConfig

    const stats = fs.statSync(target)

    const absolutePath = path.resolve(target)

    const node = {
        directory: stats.isDirectory(),
        file: stats.isFile(),
        relativePath: path.relative(projectRoot, target),
        size: stats.size,
        isProjectRoot: depth === 0,
        parent,
        depth,
        projectRoot,
        absolutePath,
        ...path.parse(absolutePath)
    }

    if (node.directory) {
        node.children = fs.readdirSync(target)
            // TODO: another way to filter
            .filter((pathInTarget) => !ignore.includes(pathInTarget))
            .map(function (pathInTarget) {
                const subTarget = path.join(target, pathInTarget)
                return treeModel(subTarget, fslintConfig, {
                    depth: depth + 1,
                    parent: node,
                    projectRoot
                })
            })
    }

    return node
}

module.exports = treeModel
