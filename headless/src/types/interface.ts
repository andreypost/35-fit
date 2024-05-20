export interface IUser {
  user: {
    name?: string
    uid?: string
    displayName?: string
    photoURL?: string
  }
}

export interface IFirebaseProps extends IUser {
  firebase?: any
  firebaseAuth?: any
  firestore?: any
  login: () => void
}

export interface IClass {
  className?: string
  classList?: string[]
}

export interface IStyle {
  styleName?: string
  styleList?: { [key: string]: any }
}

export interface ITitleDescripClass extends IClass {
  title?: any
  subTitle?: any
  description?: any
}

export interface IAppConfig {
  language: string
  setLanguage: (language: string) => void
}

export interface ISVGProps extends IClass {
  color?: string
  onClick?: any
}

export interface IChildrenTitleDescrip extends ITitleDescripClass {
  children?: JSX.Element | JSX.Element[]
  // children: [ReactElement, ReactElement]
  // children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]
}

export interface IImageLinkTitleDescrip extends ITitleDescripClass {
  imgSrc?: string
  link?: string
}

export interface ICoachTitleDescrip extends ITitleDescripClass {
  coach?: string
}

export interface ILinks {
  links: {
    route: string
    dictionary?: string
  }[]
}
