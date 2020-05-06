import {flags} from '@oclif/command'
import SearchCommand from './search'

export default class Script extends SearchCommand {
  static aliases = ['e']

  static description = 'search [text] and output as script'

  static examples = [
    `$ shes script find
Find files by filename
Find files by dirname
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-f, --field=VALUE)
    field: flags.string({
      char: 'f',
      multiple: true,
      options: ['title', 'desc', 'code'],
      default: ['title', 'desc', 'code'],
      description: 'search field',
    }),
    // flag with a value (-o, --output=VALUE)
    output: flags.enum({
      char: 'o',
      options: ['example', 'cmd', 'script'],
      default: 'script',
      description: 'output type',
    }),
  }

  static args = [{
    name: 'searchText',
    required: true,
  }]

  getParsedInput() {
    return this.parse(Script)
  }
}
