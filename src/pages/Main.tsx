import React, { useEffect, useState } from 'react'
import './main.scss'
// import redux from 'redux'
// import { createStore, combineReducers } from 'redux'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'
// import empty from '../img/empty_img.png'
// import png from './img/header_main.png'
// import svg from './img/inlineSvg/main_header_back.svg'

const Main = (): any => {
  const { t } = useTranslation()

  // useEffect(() => {



  // }, [])
  return (
    <>
      <Header>
        <>
          <h1>{t('nav.Personal training')}</h1>
          <div>
            <svg className="tie">
              <use xlinkHref="#tie_fit"></use>
            </svg>
          </div>
        </>
      </Header>
      <h1>main</h1>

    </>
  )
}
export default Main
