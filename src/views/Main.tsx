import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeaderBanner } from 'HeaderBanner'
import { TieFitSVG } from 'img/icons'

const MainBlock = styled.main`

  .header_new {
    display: grid;
    justify-content: center;
    
    
    h4 {
      font-size: 18px;
      font-weight: 900;
      color: #000044;
      position: relative;
      svg {
        position: absolute;
        left: -60px;
        top: -68px;
      }
    }

    p {
      font-size: 48px;
      font-weight: 900;
      color: #000044;

      span {
        font-size: 24px;
        text-transform: uppercase;
      }

      .header_month {
        color: #FF6376;
      }
    }
  }
  
  
  @media (max-width: 992px) {

    h4 {
      svg {
        width: 163px;
        height: 90px;
      }
    }
    
    
  }
  
  @media (min-width: 993px) {
    .header_new {

      h4 svg {
        left: -80px;
        top: -91px;
      }
    }
  
   
  }

  @media (hover: hover) {
    
  }
`

const Main = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState('')
  // console.log('main')

  useEffect(() => {
    setOpacity('active')
  }, [])

  return (
    <MainBlock className={'fallback ' + opacity}>
      <HeaderBanner className='main' title='nav.personal_training'>
        <div className='header_new'>
          <h4>
            <TieFitSVG />
            {t('header_banner.new_standard')}
          </h4>
          <p>35 <span>€</span><span className='header_month'>/{t('header_banner.month')}</span></p>
        </div>
      </HeaderBanner>
    </MainBlock>
  )
}
export default Main
