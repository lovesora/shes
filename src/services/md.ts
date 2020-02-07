import * as MarkdownIt from 'markdown-it'
import * as glob from 'glob'
import * as fs from 'fs'
import {config} from '../configs/config'

export interface SearchResult {
  title: string;
  desc?: string;
  code?: string;
}

export type SectionCode = {
  lang: string;
  code: string;
}
export type Section = {
  title: string;
  desc: string[];
  code: SectionCode[];
}
export type CacheSection = {
  src: Section;
  search: string;
}

export class MarkdownService {
  md = new MarkdownIt()

  init() {
    if (!this._checkIfExistCache()) {
      this._buildCache()
    }
  }

  search(text: string): SearchResult[] {
    return []
  }

  updateCache() {
    this._buildCache()
  }

  _checkIfExistCache(): boolean {
    return false
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
        const tokens = this.md.parse(fileContent, {})

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
        const search = `${title} ${desc.join('')} ${code.map(code => code.code).join('')}`

        return {
          src: {title, desc, code},
          search,
        }
      })

      return cacheSections
    }).reduce((prev, next) => prev.concat(next), [])

    fs.writeFileSync(config.getTmpCacheFilePath(), JSON.stringify(cacheContent), {encoding: 'utf8'})
  }
}

export const mdService = new MarkdownService()
