shes
====

shell commands examples and snippets

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/shes.svg)](https://npmjs.org/package/shes)
[![Codecov](https://codecov.io/gh/lovesora/shes/branch/master/graph/badge.svg)](https://codecov.io/gh/lovesora/shes)
[![Downloads/week](https://img.shields.io/npm/dw/shes.svg)](https://npmjs.org/package/shes)
[![License](https://img.shields.io/npm/l/shes.svg)](https://github.com/lovesora/shes/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g shes
$ shes COMMAND
running command...
$ shes (-v|--version|version)
shes/1.0.2 darwin-x64 node-v12.13.0
$ shes --help [COMMAND]
USAGE
  $ shes COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`shes cmd SEARCHTEXT`](#shes-cmd-searchtext)
* [`shes data SUBARG`](#shes-data-subarg)
* [`shes help [COMMAND]`](#shes-help-command)
* [`shes script SEARCHTEXT`](#shes-script-searchtext)
* [`shes search SEARCHTEXT`](#shes-search-searchtext)

## `shes cmd SEARCHTEXT`

search [text] and output as cmd

```
USAGE
  $ shes cmd SEARCHTEXT

OPTIONS
  -f, --field=title|desc|code        [default: title,desc,code] search field
  -h, --help                         show CLI help
  -o, --output=(example|cmd|script)  [default: cmd] output type

ALIASES
  $ shes c

EXAMPLE
  $ shes cmd find
  Find files by filename

  find . -type f -name '*.ts'
```

_See code: [src/commands/cmd.ts](https://github.com/lovesora/shes/blob/v1.0.2/src/commands/cmd.ts)_

## `shes data SUBARG`

data source

```
USAGE
  $ shes data SUBARG

ARGUMENTS
  SUBARG  (update) sub argument:

          update: update repo data

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ shes data update
```

_See code: [src/commands/data.ts](https://github.com/lovesora/shes/blob/v1.0.2/src/commands/data.ts)_

## `shes help [COMMAND]`

display help for shes

```
USAGE
  $ shes help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `shes script SEARCHTEXT`

search [text] and output as script

```
USAGE
  $ shes script SEARCHTEXT

OPTIONS
  -f, --field=title|desc|code        [default: title,desc,code] search field
  -h, --help                         show CLI help
  -o, --output=(example|cmd|script)  [default: script] output type

ALIASES
  $ shes e

EXAMPLE
  $ shes script find
  Find files by filename
  Find files by dirname
```

_See code: [src/commands/script.ts](https://github.com/lovesora/shes/blob/v1.0.2/src/commands/script.ts)_

## `shes search SEARCHTEXT`

search [text]

```
USAGE
  $ shes search SEARCHTEXT

OPTIONS
  -f, --field=title|desc|code        [default: title,desc,code] search field
  -h, --help                         show CLI help
  -o, --output=(example|cmd|script)  [default: example] output type

ALIASES
  $ shes s

EXAMPLE
  $ shes search find
  Find files by filename

  find . -type f -name '*.ts'
```

_See code: [src/commands/search.ts](https://github.com/lovesora/shes/blob/v1.0.2/src/commands/search.ts)_
<!-- commandsstop -->
