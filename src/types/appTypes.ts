
export interface FBACProps {
    firebase?: any
    firebaseAuth: any
    firestore: any
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