import { useEffect } from 'react'
// import { Link } from "react-router-dom";
import { useAppDispatch } from 'utils/hooks'
import { unsetAllModal } from 'modals/modal.slice'
import { RedRuporSVG } from 'img/icons'
import { CHLProps } from 'types/interface'

export const HeaderBanner = ({ children, className }: CHLProps) => {
  const dispatch = useAppDispatch()

  const keyDownHandler = (e: { key: string }) => {
    (e.key === 'Escape') && dispatch(unsetAllModal())
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.addEventListener('keydown', e => keyDownHandler(e))
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      dispatch(unsetAllModal())
    }
  }, [])

  return (
    <div className={`header_banner ${className}`}>
      {children[0]}
      {children[1]}
      <RedRuporSVG />
    </div>
  )
}
