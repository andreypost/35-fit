export interface FBUProps {
    firebase?: any
    firebaseAuth?: any
    firestore?: any
    user: any
    login: () => void
}

export interface CLProp {
    className?: string
}

export interface TDCLProps extends CLProp {
    title?: any
    subTitle?: any
    descript?: any
}

export interface ACProps {
    language: string
    setLanguage: (language: string) => void
}

export interface ISVGProp extends CLProp {
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
    link? : string
}