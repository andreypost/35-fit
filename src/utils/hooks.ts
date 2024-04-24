import React, { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'reducer'
import type { AppDispatch } from 'store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const GetCurrentWindowScroll = () => {
  const [winScroll, getWinScroll] = useState(0)
  const setState = () => {
    getWinScroll(document.body.scrollTop || document.documentElement.scrollTop)
  }
  useEffect(() => {
    window.addEventListener('scroll', setState)
    return () => window.removeEventListener('scroll', setState)
  }, [])
  return winScroll
}
