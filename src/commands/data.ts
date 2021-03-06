import {Command, flags} from '@oclif/command'
import {dataService} from '../services/data'
import {mdService} from '../services/md'

export default class Data extends Command {
  static description = 'data source'

  static examples = [
    `$ shes data update
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'subArg',
    required: true,
    description: `sub argument:

update: update repo data
    `,
    options: ['update'],
  }]

  init() {
    dataService.init()
    mdService.init()

    return super.init()
  }

  async run() {
    const {args} = this.parse(Data)

    const {subArg} = args

    switch (subArg) {
    case 'update': {
      console.log('updating data...')
      dataService.update()
      console.log('updating cache...')
      mdService.updateCache()
      console.log('done')
      break
    }
    default:
      break
    }
  }
}
