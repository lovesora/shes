import * as colors from 'colors'
import {highlight} from 'cli-highlight'
import {SectionCode} from '../services/md'

const INDENT = '  '

export const logTitle = (title: string): void => console.log(colors.bold(title), '\n')

export const logDesc = (descs: string[]): void => descs.forEach(desc => {
  desc.split('\n').forEach(line => console.log(INDENT, line))
  console.log('')
})

export const logCode = (codes: SectionCode[]): void => codes.forEach(code => {
  highlight(code.code, {language: code.lang}).split('\n').forEach(line => console.log(INDENT, line))
  console.log('')
})
