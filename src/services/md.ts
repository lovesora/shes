import * as MarkdownIt from 'markdown-it'
import * as glob from 'glob'
import * as fs from 'fs'
import {config} from '../configs/config'

export type SectionCode = {
  lang: string;
  code: string;
}
export type Section = {
  title: string;
  desc: string[];
  code: SectionCode[];
}
// export type CacheSection = {
//   src: Section;
//   search: string;
// }
export type CacheSection = {
  [K in keyof Section]: {
    src: Section[K];
    search: string;
  }
}

export class MarkdownService {
  _md = new MarkdownIt()

  _cache: CacheSection[] | null = null

  get cache() {
    if (this._cache === null) {
      try {
        this._cache = JSON.parse(fs.readFileSync(config.getTmpCacheFilePath(), {encoding: 'utf8'}))
      } catch (error) {
        this._cache = []
      }
    }

    return this._cache
  }

  /**
   * init cache data if not exist
   */
  init() {
    if (!this._checkIfExistCache()) {
      this._buildCache()
    }
  }

  /**
   * update cache when data updated
   */
  updateCache() {
    this._buildCache()
  }

  search<K extends keyof CacheSection>(text: string, keys: K[]): CacheSection[] {
    return (this.cache || []).filter(
      cacheSection => new RegExp(text, 'ig').test(keys.map(key => cacheSection[key].search).join(' '))
    )
  }

  _checkIfExistCache(): boolean {
    return fs.existsSync(config.getTmpCacheFilePath())
  }

  _buildCache() {
    const mdFiles = glob.sync(
      `${config.getTmpReposDir()}/**/*.md`, {
        ignore: config.getExcludeFiles(),
      }
    )

    const cacheContent = mdFiles.map(filePath => {
      const getSections = () => {
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})
        const tokens = this._md.parse(fileContent, {})

        let section: typeof tokens = []
        const sections: (typeof section)[] = []

        // split tokens into section
        tokens.forEach(token => {
          if (token.type === 'heading_open') {
            section.length && sections.push([...section])
            section = []
          }
          section.push(token)
        })
        sections.push([...section])

        return sections
      }

      const sections = getSections()
      const cacheSections: CacheSection[] = sections.map(tokens => {
        const headingCloseIndex = tokens.findIndex(token => token.type === 'heading_close')
        const title = tokens.slice(1, headingCloseIndex).reduce((prev, next) => prev + next.content, '')
        const desc = tokens.slice(headingCloseIndex + 1).filter(token => token.type === 'inline').map(token => token.content)
        const code = tokens.slice(headingCloseIndex + 1).filter(token => token.type === 'fence' && token.tag === 'code').map(token => ({
          lang: token.info,
          code: token.content,
        }))

        return {
          title: {src: title, search: title},
          desc: {src: desc, search: desc.join(' ')},
          code: {src: code, search: code.map(c => c.code).join(' ')},
        }
      })

      return cacheSections
    }).reduce((prev, next) => prev.concat(next), [])

    fs.writeFileSync(config.getTmpCacheFilePath(), JSON.stringify(cacheContent), {encoding: 'utf8'})
  }
}

export const mdService = new MarkdownService()
