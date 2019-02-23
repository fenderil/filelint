# fsolint
Linter for project's file system

## Why?
Linter would be useful for whom, who have multirepo projects,
CI and don't want to care about file structure on code-review.
Additionally linter would be helpful for new developers in project.

## API

### CLI
`fslint --target="." --config="./.fsolintrc"`

### Node.js
```
const fsolint = require('fsolint')

fsolint({
    configPath: './.fsolintrc',
    target: '.'
})
```

## Recommended config
[There](./lib/configuration/default.json)

## Configuration
* extends (`string|array[string]`) - where can linter get more rule configurations
* plugins (`string|array[string]`) - where can linter get more rule callbacks
* ignore (`string|array[string]`) - where linter shouldn't look up (with all subfiles and subdirs)
* overrides /coming/
* rules (`object`) - set of rules as keys and their configurations as values.
Rule severity can be set without options as rule value or
with options as object value under "severity" key.
Possible values:
  * Warning - one of 'warning', 'warn', 1
  * Error - one of 'error', 2
  * Nothing - one of 'off', 0

## Rules
* cases - files' and folders' case
* max-depth - max depth of folder/file in project
* new-line-end-file - \n in end of each file
* no-dirs-extension - folders without extensions
* no-duplicates - same name files and folders with different extensions
* no-empty-dirs - folder without children
* no-empty-files - file with zero size
* project-structure (not developed) - json-schema project sctucture (need to be <root>/lib folder, optional Jenkinsfile, etc.)
* required-index - in each folder must be index file
* ...your recommendations

## Rules API
Each rule exports object with keys:
* rule (required) - cb that returns object with message, if check is not passed
* fix (optional) - cb for fixing lint error/warn

Both functions getting current model node.
Node includes:
* directory (`bool`) - is node directory
* file (`bool`) - is node file
* relativePath (`string`) - relative path to the node
* size (`number`) - byte size of node
* isProjectRoot (`bool`) - is node root of project
* parent (`Node`) - parent node
* depth (`number`) - depth of node in project structure
* projectRoot (`string`) - path to project root
* absolutePath (`string`) - absolute path to the node

And absolute path parsed data (https://nodejs.org/api/path.html#path_path_parse_path)

## Coming features
* Fix flag (should modify node model and work in reverse - from deep nodes to root node)
* File reporters
* Throwing errors
* Structure comparing
* Overrides
* Stream, links and other
* ...your recommendations


## Roadmap

* Extend (hold)
* Plugin (hold)
* Config parser
* Overrides (cause no inline comments are allowed)
* Reporters (not only CLI)
* Flags like quiet and fix
* .fsolintignore
* Project structure rule

## Credentials

* Name: Tupitckiy Ilya
* Email: fenderil@yandex.ru

____

And it's very simple to white rules for fsolint!
All you need for check is in Node object.
And you can get more data for check by using absolute path.
