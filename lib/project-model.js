const fs = require('fs')
const path = require('path')

function projectModel (target, {
    parent,
    depth = 0,
    projectRoot = path.resolve(target),
    ignore
} = {}) {
    const stats = fs.statSync(target)

    const absolutePath = path.resolve(target)

    const item = {
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

    if (item.directory) {
        item.children = fs.readdirSync(target)
            .filter((pathInTarget) => !ignore.includes(pathInTarget))
            .map(function (pathInTarget) {
                const subTarget = path.join(target, pathInTarget)
                return projectModel(subTarget, {
                    depth: depth + 1,
                    parent: item,
                    projectRoot,
                    ignore
                })
            })
    }

    return item
}

module.exports = projectModel
