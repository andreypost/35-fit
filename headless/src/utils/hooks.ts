import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'reducer'
import type { AppDispatch } from 'store'
import { isBrowser } from './isBrowser'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const GetCurrentWindowScroll = (threshold: number) => {
  const [winScroll, setWinScroll] = useState(0)
  const handleScroll = () =>
    setWinScroll(document.body.scrollTop || document.documentElement.scrollTop)
  useEffect(() => {
    if (isBrowser()) {
      setWinScroll(
        document.body.scrollTop || document.documentElement.scrollTop
      )
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  })
  return winScroll > threshold
}
