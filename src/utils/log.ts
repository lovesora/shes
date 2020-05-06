import * as chalk from 'chalk'
import {highlight} from 'cli-highlight'
import {SectionCode} from '../services/md'

const INDENT = '    '

export type formatOption = {
  indent?: string;
}

const defaultWhite = (...args: string[]) => chalk.rgb(178, 178, 178)(...args)

export const formatTitle = (title: string): string => `${chalk.bold(title)}`

export const formatDesc = (descs: string[], {indent = INDENT}: formatOption = {}): string => descs.reduce((prevP, nextP) => {
  const nextParsedP = nextP.split('\n').reduce((prevL, nextL) => `${prevL}\n${indent}${nextL}`, '')
  return `${prevP}\n${defaultWhite(nextParsedP)}`
}, '')

export const formatCode = (codes: SectionCode[], {indent = INDENT}: formatOption = {}): string => defaultWhite(codes.reduce((prevP, nextCode) => {
  const nextParsedP = highlight(nextCode.code, {language: nextCode.lang}).split('\n').reduce((prevL, nextL) => `${prevL}\n${indent}${nextL}`, '')
  const wrapedCode = `${indent}${'```' + nextCode.lang}${nextParsedP}${'```'}`
  return `${prevP}\n\n${wrapedCode}\n`
}, ''))
