# filesystemlint
Linter for project's file system

## Why?
Linter would be useful for whom, who have multirepo projects,
CI and don't want to care about file structure on code-review.
Additionally linter would be helpful for new developers in project.

## API

### CLI
`fslint --target="." --config="./.fslintrc"`

### Node.js
```
const fslint = require('filesystemlint')

fslint({
    configPath: './.fslintrc',
    target: '.',
    ignore: ['node_modules', '.git', '.idea']
})
```

## Recommended config
[There](./lib/default-config.json)

## Rules
* cases - files' and folders' case
* crlf (not developed) - new line cr/lf chars
* max-depth - max depth of folder/file in project
* new-line-end-file - \n in end of each file
* no-dirs-extension - folders without extensions
* no-duplicates - same name files and folders with different extensions
* no-empty-dirs - folder without children
* no-empty-files - file with zero size
* project-structure (not developed) - json-schema project sctucture (need to be <root>/lib folder, optional Jenkinsfile, etc.)
* required-index - in each folder must be index file
* ...your recommendations

## Coming features
* Reading of plugins
* Reading of extends
* Fix flag
* Quiet flag
* File reporters
* Throwing errors
* Global ignore patters (some folder are hardcoded for the current moment)
* Personal rule ignore patters
* Structure comparing
* Stream, links and other
* ...your recommendations

## Credentials

* Name: Tupitckiy Ilya
* Email: fenderil@yandex.ru
