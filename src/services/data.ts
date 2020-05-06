import * as gh from 'parse-github-url'
import * as shell from 'shelljs'
import * as fs from 'fs'
import * as highlight from 'cli-highlight'
import {cli} from 'cli-ux'
import {config} from '../configs/config'

export class DataService {
  tmpDir: string

  repos: string[]

  constructor() {
    if (!shell.which('git')) {
      throw new Error('Error, git required!')
    }

    this.tmpDir = config.getTmpReposDir()
    this.repos = config.getRepos()

    // check if exist temp dir
    if (!fs.existsSync(this.tmpDir)) {
      shell.mkdir('-p', this.tmpDir)
    }
  }

  /**
   * clone data from git repoo
   * if repo exist in local, it will be skipped
   */
  init(): void {
    this.repos.forEach(repoUrl => {
      const parsedUrl = gh(repoUrl)

      if (!parsedUrl) return

      const {repo} = parsedUrl
      if (!fs.existsSync(`${this.tmpDir}/${repo}`)) {
        cli.action.start('initializing')
        shell.exec(`git clone ${repoUrl} ${this.tmpDir}/${repo}`)
        cli.action.stop()
      }
    })
  }

  /**
   * update all repo data
   * execute: git pull
   */
  update(): void {
    this.init()

    cli.action.start('updating')
    this.repos.forEach(repoUrl => {
      const parsedUrl = gh(repoUrl)

      if (!parsedUrl) return

      const {repo} = parsedUrl
      if (fs.existsSync(`${this.tmpDir}/${repo}`)) {
        const cmd = `cd ${this.tmpDir}/${repo} && git pull 1>/dev/null`
        console.log('excuting: ')
        console.log('  ', highlight.highlight(cmd, {language: 'bash'}))
        shell.exec(cmd)
      }
    })
    cli.action.stop()
  }
}

export const dataService = new DataService()
