import ast from './ast'
import { simpleMdReader, style } from '../main.d'

const simpleMd: simpleMdReader = function(str:string = '') {
  const reg = {
    h1: /^\#\s.*/g,
    h2: /^\#{2}\s.*/g,
    h3: /^\#{3}\s.*/g,
    h4: /^\#{4}\s.*/g,
    quote: /^\>\s.*/g,
  }
  const splitStr = str.split('\n')
  return splitStr.map(item => {
    let className: style = 'common-block'
    let str = item
    if(reg.h1.test(item)) {
      className = 'h1-block'
      str = str.slice(2)
    } else if(reg.h2.test(item)) {
      className = 'h2-block'
      str = str.slice(3)
    } else if(reg.h3.test(item)) {
      className = 'h3-block'
      str = str.slice(4)
    } else if(reg.h4.test(item)) {
      className = 'h4-block'
      str = str.slice(5)
    } else if(reg.quote.test(item)) {
      className = 'quote-block'
      str = str.slice(2)
    }
    let content = ast(str)
    return {
      className,
      content
    }
  })
}

export default simpleMd
