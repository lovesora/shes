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
shes/0.0.1-beta.0 darwin-x64 node-v12.13.0
$ shes --help [COMMAND]
USAGE
  $ shes COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`shes data SUBARG`](#shes-data-subarg)
* [`shes hello [FILE]`](#shes-hello-file)
* [`shes help [COMMAND]`](#shes-help-command)
* [`shes search SEARCHTEXT`](#shes-search-searchtext)

## `shes data SUBARG`

describe the command here

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

_See code: [src/commands/data.ts](https://github.com/lovesora/shes/blob/v0.0.1-beta.0/src/commands/data.ts)_

## `shes hello [FILE]`

describe the command here

```
USAGE
  $ shes hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ shes hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/lovesora/shes/blob/v0.0.1-beta.0/src/commands/hello.ts)_

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

## `shes search SEARCHTEXT`

search [text]

```
USAGE
  $ shes search SEARCHTEXT

OPTIONS
  -f, --field=title|desc|code        [default: title,desc,code] search field
  -h, --help                         show CLI help
  -o, --output=(example|cmd|script)  [default: example] output type

EXAMPLE
  $ shes search find
  Find files by filename

  find . -type f -name '*.ts'
```

_See code: [src/commands/search.ts](https://github.com/lovesora/shes/blob/v0.0.1-beta.0/src/commands/search.ts)_
<!-- commandsstop -->
