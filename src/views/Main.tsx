import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeaderBanner } from 'HeaderBanner'
import { MinutesSVG, RedRuporSVG, SuccessSVG, SupportSVG, TieFitSVG } from 'img/icons'
import { Link } from 'react-router-dom'
import { RESERVE_ROUTE, PRICE_ROUTE, TRAIN_ROUTE } from 'utils/routes.constants'
import { ImageDescription } from 'components/ImageDescription'

import add_01 from '../img/adds/add_1_1.png'
import add_02 from '../img/adds/add_1_2.png'
import add_03 from '../img/adds/add_1_3.png'

const MainBlock = styled.main`
  .header_new {
    display: grid;
    justify-content: center;
    padding-bottom: 120px;
    
    h4 {
      font-size: 22px;
      text-transform: uppercase;
      position: relative;
      svg {
        position: absolute;
        left: -60px;
        top: -68px;
      }
    }

    p {
      font-size: 54px;
      span {
        font-size: 28px;
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
        height: 54px;
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
          height: 64px;
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
            <Link className='flex_center_center b900 white' to={RESERVE_ROUTE}>{t('main.register_trial')}</Link>
          </div>
          <div className='rupor_book'>
            <p className='b900 grey'>{t('main.connected_results')}</p>
            <Link className='flex_center_center light_grey_button b900 green' to={PRICE_ROUTE}>{t('main.book_class')}</Link>
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
      <ImageDescription imgSrc={add_01} title='nav.personal_training' descript='header_banner.35_minute_high' link={TRAIN_ROUTE} />
      <div className='section flex_center_bet'>
        <div>
          <SupportSVG />
          <h3 className='b900 grey'>{t('main.more_time_for_personal')}</h3>
        </div>
        <div>
          <MinutesSVG />
          <h3 className='b900 grey'>{t('main.35_minutes_to_better')}</h3>
        </div>
        <div>
          <SuccessSVG />
          <h3 className='b900 grey'>{t('main.versatile_training_incentives')}</h3>
        </div>
      </div>
      <ImageDescription imgSrc={add_02} title='main.connected_training_system' descript='main.never_before_has_digital' link={TRAIN_ROUTE} />
      <ImageDescription className='right_img' imgSrc={add_03} title='main.training_by_science' descript='main.the_milonizer_can_determine' link={TRAIN_ROUTE} />

      
    </MainBlock>
  )
}
export default Main