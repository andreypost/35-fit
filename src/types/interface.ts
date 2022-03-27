export interface FBUProps {
    firebase?: any
    firebaseAuth?: any
    firestore?: any
    user: any
    login: () => void
}

export interface ACProps {
    language: string
    setLanguage: (language: string) => void
}


export interface ISVGProp {
    className?: string
    color?: string
    onClick?: any
}

export interface CHLProps {
    children: JSX.Element | JSX.Element[]
    className?: string
    // children: [ReactElement, ReactElement]
    // children: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined)[]
}