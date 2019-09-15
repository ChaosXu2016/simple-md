import { style, AstItem } from '../main.d'
const bolderRegStr = '\\*{2}(.*?)\\*{2}'
const codeRegStr = '\\`(.*?)\\`'
const lineRegStr = '\\~(.*?)\\~'
const imageRegStr = '\\!\\[(.*?)\\]\\((.*?)\\)'

function bolder(content: string, ast: AstItem[]) {
  const style: style = 'text-bolder'
  const reg = new RegExp('^' + bolderRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function code(content: string, ast: AstItem[]) {
  const style: style = 'text-code'
  const reg = new RegExp('^' + codeRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function line(content: string, ast: AstItem[]) {
  const style: style = 'text-line'
  const reg = new RegExp('^' + lineRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function image(content: string, ast: AstItem[]) {
  const style: style = 'image-block'
  const reg = new RegExp('^' + imageRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style,
    alt: res[1] || '',
    src: res[2]
  })
  return content.slice(match.length)
}

function common(content: string, ast: AstItem[]) {
  const style: style = 'text-common'
  const reg = new RegExp(`^(.*?)(?=${bolderRegStr}|${lineRegStr}|${codeRegStr}|${imageRegStr}|$)`)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style,
    text: match
  })
  return content.slice(match.length)
}

function simpleMdAST(mdStr: string): AstItem[] {
  let ast: AstItem[] = []
  let txt = mdStr
  while(txt) {
    let nextTxt = txt
    nextTxt = code(nextTxt, ast)
    nextTxt = bolder(nextTxt, ast)
    nextTxt = line(nextTxt, ast)
    nextTxt = image(nextTxt, ast)
    nextTxt = common(nextTxt, ast)
    if(nextTxt === txt) {
      ast.push({
        text: nextTxt || ''
      })
      nextTxt = ''
    }
    txt = nextTxt
  }
  return ast
}

export default simpleMdAST
