export interface IAuth {
  name?: string
  surname?: string
  gender?: string
  age?: number
  country?: string
  city?: string
  email?: string
  password?: string
  phone?: string
  emergencyName?: string
  emergencyPhone?: string
  uid?: string
  displayName?: string
  photoURL?: string
}

export interface IUser {
  user: IAuth
}

export interface IFirebaseProps {
  user?: IAuth
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
  title?: string
  subTitle?: any
  description?: string
}

export interface IRoutePriceTitle extends ITitleDescripClass {
  text?: string
  route?: string
  price?: string
}

export interface IAppConfig {
  language: string
  setLanguage: (language: string) => void
  currentUser: IAuth | null
  setCurrentUser: (currentUser: IAuth | null) => void
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

export interface IPlanPricesBoxRoute extends IRoutePriceTitle {
  sales?: number
  button?: string
}

export interface IRouteParams {
  name?: string
}

export interface IGetImageById {
  imageById: {
    id: string
    title: string
    category: string
    owner: string
    url: string
  }
}

export interface IGetImages {
  imagesByCategory: IGetImageById['imageById'][]
}
