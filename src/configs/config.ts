import {homedir} from 'os'

/**
 * 1. Merge configs from home dir '~/.shesrc'
 */
export class Config {
  static _instance: Config

  static getInstance() {
    if (!Config._instance) {
      Config._instance = new Config()
    }

    return Config._instance
  }

  _homedir = homedir()

  _configPath = '~/.shesrc'

  getConfigPath(): string {
    if (this._configPath.startsWith('~/')) {
      return `${this._homedir}/${this._configPath.slice(2)}`
    }

    return this._configPath
  }

  tmpDir = '~/.shes'

  getTmpDir() {
    if (this.tmpDir.startsWith('~/')) {
      return `${this._homedir}/${this.tmpDir.slice(2)}`
    }

    return this.tmpDir
  }

  getTmpReposDir() {
    return `${this.getTmpDir()}/repos`
  }

  getTmpCacheFilePath() {
    return `${this.getTmpDir()}/.cache`
  }

  repos: string[] = []

  getRepos() {
    return this.repos
  }

  excludeFiles: string[] = [
    '**/README.md',
  ]

  getExcludeFiles() {
    return this.excludeFiles
  }

  constructor() {
    try {
      const userConfig: any = require(this.getConfigPath())

      if (typeof userConfig !== 'object') throw new Error('Wrong config content')

      for (const prop in this) {
        if (!prop.startsWith('_') && typeof this[prop] !== 'function' && userConfig[prop] !== undefined) {
          this[prop] = userConfig[prop]
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const config = Config.getInstance()
