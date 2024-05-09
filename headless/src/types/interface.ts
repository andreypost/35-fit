export interface UserType {
  user: {
    name?: string
    uid?: string
    displayName?: string
    photoURL?: string
  }
}

export interface FBUProps extends UserType {
  firebase?: any
  firebaseAuth?: any
  firestore?: any
  login: () => void
}

export interface ClassType {
  className?: string
  classList?: [string]
}

export interface StyleType {
  styleName?: string
  styleList?: { [key: string]: any }
}

export interface TDCLProps extends ClassType {
  title?: any
  subTitle?: any
  descript?: any
}

export interface ACProps {
  language: string
  setLanguage: (language: string) => void
}

export interface ISVGProp extends ClassType {
  color?: string
  onClick?: any
}

export interface CHTDCLProps extends TDCLProps {
  children?: JSX.Element | JSX.Element[]
  // children: [ReactElement, ReactElement]
  // children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]
}

export interface ILTDCLProps extends TDCLProps {
  imgSrc?: string
  link?: string
}

export interface TDCLCHProps extends TDCLProps {
  coach?: string
}

export interface LinksType {
  links: {
    route: string
    dictionary?: string
  }[]
}
