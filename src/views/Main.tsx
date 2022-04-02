import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeaderBanner } from 'HeaderBanner'
import { RedRuporSVG, TieFitSVG } from 'img/icons'
import { Link } from 'react-router-dom'
import { RESERVE_ROUTE, PRICE_ROUTE } from 'utils/routes.constants'

const MainBlock = styled.main`
  .header_new {
    display: grid;
    justify-content: center;
    padding-bottom: 120px;
    
    h4 {
      font-size: 18px;
      text-transform: uppercase;
      position: relative;
      svg {
        position: absolute;
        left: -60px;
        top: -68px;
      }
    }

    p {
      font-size: 48px;
      span {
        font-size: 24px;
        text-transform: uppercase;
      }
      .header_month {
        color: #FF6376;
      }
    }
  }

  .rupor {
    display: grid;
    gap: 25px;
    text-align: center;

    .rupor_trial, .rupor_book {
      padding: 30px 20px;
      a {
        box-sizing: border-box;
        height: 64px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 15px;
        border-radius: 32px;
      }
    }
    
    .rupor_trial {
      background: #000044;
      position: relative;

      svg {
        position: absolute;
        top: -70px;
        left: -30px;
        @media (max-width: 992px) {
          width: 120px;
          height: 120px;
        }
      }

      h6 {
        font-size: 86px;
        span {
          font-size: 64px;
        }
      }
      p {
        font-size: 24px;
        margin-bottom: 23px;
      }
      a {
        background-color: #59B894;
        transition: background-color .2s;
        &:hover {
          background-color: #ff6376;
        }
      }
    }

    .rupor_book {
      display: flex;
      flex-flow: column;
      p {
        font-size: 32px;
        margin-bottom: 76px;
      }
      a {
        border: 2px solid #E8E8E8;
        border-radius: 32px;
        background-color: white;
        transition: background-color .2s;
        &:hover {
          background-color: #59B894;
          color: white;
        }
      }
    }
  }
  
  .rupor_trial, .rupor_book, .rupor_member {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.148126);
    border-radius: 6px;
  }
  
  .rupor_member {
    box-sizing: border-box;
    max-width: 765px;
    margin: 25px auto 120px;
    padding: 28px 30px 13px;
    text-align: center;

    h6 {
      font-size: 22px;
    }

    .grey_line {
      height: 14px;
      margin-top: 20px;
      margin-bottom: 10px;
      border-radius: 6px;
      background-color: #e8e8e8;

      @keyframes greeLineWidth {
        0% {
          width: 0%;
        }
        100% {
          width: 76%;
        }
      }

      .green_line {
        height: 14px;
        border-radius: 6px;
        background-color: #59b894;
        animation: greeLineWidth 2s infinite alternate;
        // animation: greeLineWidth 2s;
      }
    }

    p {
      font-size: 16px;
      text-transform: uppercase;
    }
  }
  
  
  @media (max-width: 992px) {
    h4 {
      svg {
        width: 163px;
        height: 90px;
      }
    }
    
    .rupor_trial, .rupor_book, .rupor_member {
      box-sizing: border-box;
      width: 100%;
      max-width: 330px;
      justify-self: center;
    }
  }
  
  @media (min-width: 993px) {
    .header_new {
      h4 svg {
        left: -80px;
        top: -91px;
      }
    }
    .rupor {
      grid-template-columns: 370px 370px;
      justify-content: center;

      .rupor_trial, .rupor_book {
        padding: 37px 47px;
        a {
          font-size: 18px;
        }
      }
      .rupor_trial {
        svg {
          top: -100px;
          left: -100px;
        }
      }
    }
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
        <div className='header_new blue'>
          <h4 className='b900'>
            <TieFitSVG />
            {t('header_banner.new_standard')}
          </h4>
          <p className='b900'>35<span>€</span><span className='header_month'>/{t('header_banner.month')}</span></p>
        </div>
      </HeaderBanner>
      <div className='section'>
        <div className='rupor white'>
          <div className='rupor_trial'>
            <RedRuporSVG />
            <h6>17<span className='b900'>€</span></h6>
            <p className='b900'>3 {t('main.classes')}</p>
            <Link className='b900 white' to={RESERVE_ROUTE}>{t('main.register_trial')}</Link>
          </div>
          <div className='rupor_book'>
            <p className='b900 grey'>{t('main.connected_results')}</p>
            <Link className='b900 green' to={PRICE_ROUTE}>{t('main.book_class')}</Link>
          </div>
        </div>
        <div className='rupor_member'>
          <h6 className='b900 grey'>{t('main.number_memberships')}</h6>
          <div className="grey_line">
            <div className="green_line"></div>
          </div>
          <p className='b900 blue'>76%{t('main.sold')}</p>
        </div>
      </div>
    </MainBlock>
  )
}
export default Main