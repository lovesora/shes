import * as gh from 'parse-github-url'
import * as shell from 'shelljs'
import * as fs from 'fs'
import {config} from '../configs/config'

export class Data {
  constructor() {
    if (!shell.which('git')) {
      throw new Error('Error, git required!')
    }
  }

  init(): void {
    const tmpDir = config.getTmpReposDir()
    const repos = config.getRepos()

    // check if exist temp dir
    if (!fs.existsSync(tmpDir)) {
      shell.mkdir('-p', tmpDir)
    }

    // clone repo
    repos.forEach(repoUrl => {
      const parsedUrl = gh(repoUrl)

      if (!parsedUrl) return

      const {repo} = parsedUrl
      if (!fs.existsSync(`${tmpDir}/${repo}`)) {
        shell.exec(`git clone ${repoUrl} ${tmpDir}/${repo}`)
      }
    })
  }

  update(): void {
    // pull repo content
  }
}

export const data = new Data()
