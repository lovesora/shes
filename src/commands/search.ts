import {Command, flags} from '@oclif/command'
import * as prompts from 'prompts'
import * as shelljs from 'shelljs'
import {dataService} from '../services/data'
import {mdService, CacheSection, SectionCode} from '../services/md'
import {formatTitle, formatDesc, formatCode} from '../utils/log'

export default class Search extends Command {
  static aliases = ['s']

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

  getParsedInput() {
    return this.parse(Search)
  }

  async run() {
    const {args, flags} = this.getParsedInput()

    const {
      field,
      output,
    } = flags
    const {
      searchText,
    } = args

    const searchResult = mdService.search(searchText, field as [keyof CacheSection])

    if (searchResult.length === 0) {
      this.warn('nothing found!')
      this.exit()
    }

    switch (output) {
    case 'example':
      this.displayExample(searchResult)
      break
    case 'cmd':
      await this.displayCMD(searchResult)
      break
    case 'script':
      await this.displayScript(searchResult)
      break
    }
  }

  displayExample(searchResult: CacheSection[]): void {
    searchResult.forEach((sec, index) => {
      console.log(`${index})`, formatTitle(sec.title.src), formatDesc(sec.desc.src), formatCode(sec.code.src))
    })
  }

  async displayCMD(searchResult: CacheSection[]) {
    const response = await prompts({
      type: 'autocomplete',
      name: 'cmd',
      message: 'Which one do you want to excute?',
      choices: searchResult.map(sec => ({
        title: formatTitle(sec.title.src) + formatDesc(sec.desc.src, {indent: '\t'}) + formatCode(sec.code.src, {indent: '\t'}),
        value: sec.code.src,
      })),
      initial: 0,
      limit: 4,
      suggest: (input, choices) => {
        try {
          const result = choices.filter(i => new RegExp(input, 'i').test(i.title))
          if (result.length === 0) {
            result.push({title: 'nothing found', value: null, disabled: true})
          }
          return Promise.resolve(result)
        } catch (error) {
          return Promise.resolve([{title: 'invalid regexp', value: null, disabled: true}])
        }
      },
    })

    if (Array.isArray(response.cmd)) {
      return Promise.all(response.cmd.map(async (cmd: SectionCode) => {
        const code = cmd.code
        const reg = /\${(?<key>[a-zA-Z_]+)(:-(?<value>.*))?}/g

        let envs = ''
        let matches
        for (;(matches = reg.exec(code)) !== null;) {
          const groups: any = matches.groups
          const {key, value} = groups

          const result = await prompts({
            type: 'text',
            name: 'variable',
            message: `override value of '${key}' (default: ${value})`,
          })

          // if `Ctrl + c`, cancel cmd
          if (result.variable === undefined) {
            return
          }

          if (result.variable) {
            envs = `${envs}${key}=${result.variable}\n`
          }
        }
        return shelljs.exec(envs + code)
      }))
    }
  }

  async displayScript(searchResult: CacheSection[]) {
    const response = await prompts({
      type: 'autocomplete',
      name: 'script',
      message: 'Which one do you want to excute?',
      choices: searchResult.map(sec => ({
        title: formatTitle(sec.title.src) + formatDesc(sec.desc.src, {indent: '\t'}),
        value: sec.code.src,
      })),
      initial: 0,
      limit: 4,
      suggest: (input, choices) => {
        try {
          const result = choices.filter(i => new RegExp(input, 'i').test(i.title))
          if (result.length === 0) {
            result.push({title: 'nothing found', value: null, disabled: true})
          }
          return Promise.resolve(result)
        } catch (error) {
          return Promise.resolve([{title: 'invalid regexp', value: null, disable: true}])
        }
      },
    })

    if (Array.isArray(response.script)) {
      return Promise.all(response.script.map(async (script: SectionCode) => {
        console.log(formatCode([script], {indent: '\t'}))

        const result = await prompts({
          type: 'confirm',
          name: 'executable',
          message: 'Do you want to execute the script above?',
          initial: true,
        })

        // if `Ctrl + c`, cancel cmd
        if (result.executable === undefined) {
          return
        }

        if (result.executable) {
          return shelljs.exec(script.code)
        }
      }))
    }
  }
}
