import {flags} from '@oclif/command'
import SearchCommand from './search'

export default class Cmd extends SearchCommand {
  static aliases = ['c']

  static description = 'search [text] and output as cmd'

  static examples = [
    `$ shes cmd find
Find files by filename

find . -type f -name '*.ts'
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
      default: 'cmd',
      description: 'output type',
    }),
  }

  static args = [{
    name: 'searchText',
    required: true,
  }]

  getParsedInput() {
    return this.parse(Cmd)
  }
}
