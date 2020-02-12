import {Command, flags} from '@oclif/command'
import {dataService} from '../services/data'
import {mdService, CacheSection} from '../services/md'

export default class Search extends Command {
  static description = 'search [text]'

  static examples = [
    `$ shes search find
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
      default: 'example',
      description: 'output type',
    }),
  }

  static args = [{
    name: 'searchText',
    required: true,
  }]

  init() {
    dataService.init()
    mdService.init()

    return super.init()
  }

  async run() {
    const {args, flags} = this.parse(Search)

    const {
      field,
      output,
    } = flags
    const {
      searchText,
    } = args

    const searchResult = mdService.search(searchText, field as [keyof CacheSection])

    this.log(`${field} ${output} ${searchText}`)
    this.log(JSON.stringify(searchResult.map(s => s.title.src)))
  }
}