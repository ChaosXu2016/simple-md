export type style = 'common-block' | 'h1-block' | 'h2-block' | 'h3-block' | 'h4-block' | 'quote-block' | 'text-bolder' | 'image-block'
| 'text-code' | 'text-line' | 'text-common'

export interface TextItem {
  style?: style,
  text: string
}

export interface ImageItem {
  style?: style;
  src?: string;
  alt?: string;
}

export type AstItem = ImageItem | TextItem

export interface SimpleMdItem {
  className: style;
  content: AstItem[];
}

export interface simpleMdReader {
  (mdStr?: string): SimpleMdItem[]
}
