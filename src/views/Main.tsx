import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getCurrentWindowScroll } from 'utils/hooks'
import { RESERVE_ROUTE, PRICE_ROUTE, TRAIN_ROUTE } from 'utils/routes.constants'
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'
import { CommunityArticle } from 'components/CommunityArticle'

import { MinutesSVG, RedRuporSVG, SuccessSVG, SupportSVG, TieFitSVG, TieWowSVG } from 'img/icons'
import add_01 from '../img/adds/add_1_1.png'
import add_02 from '../img/adds/add_1_2.png'
import add_03 from '../img/adds/add_1_3.png'
import { InstaImages } from 'components/InstaImages'

const MainBlock = styled.main`
  .header_new {
    display: grid;
    justify-content: center;
    padding-bottom: 120px;
    h4 {
      font-size: 22px;
      svg {
        left: -60px;
        top: -68px;
      }
    }
    p {
      font-size: 54px;
      span {
        font-size: 28px;
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
      svg {
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
    margin: 25px auto 0;
    padding: 28px 30px 13px;
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
    }
  }
  .main_icons {
    gap: 40px;
    h3 {
      max-width: 280px;
    }
  }
  .main_wow article {
      margin-bottom: 30px;
      p {
        svg {
          width: 160px;
          left: -60px;
          top: -65px;
        }
        font-size: 46px;
        span {
          font-size: 24px;
        }
        .header_month {
          color: #FF6376;
        }
    }
    h2 {
      font-size: 32px;
    }
  }
  @media (max-width: 992px) {
    h4 svg {
      width: 163px;
      height: 90px;
    }
    .rupor_trial, .rupor_book, .rupor_member {
      box-sizing: border-box;
      width: 100%;
      max-width: 330px;
      justify-self: center;
    }
    .main_icons {
      flex-flow: column;
    }
    .main_wow article {
      flex-flow: column;
      gap: 75px;
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
      .rupor_trial svg {
        top: -100px;
        left: -100px;
      }
    }
    .main_wow article {
      gap: 120px;
    }
  }
`

const Main = ({ user }) => {
  const { t } = useTranslation(),
    [opacity, setOpacity] = useState(''),
    winScroll = getCurrentWindowScroll(),
    [content, setContent] = useState({ first: false, second: false, third: false })

  useEffect(() => {
    setOpacity('active')
  }, [])

  useEffect(() => {
    winScroll > 300 && setContent(prev => ({ ...prev, first: true }))
    winScroll > 600 && setContent(prev => ({ ...prev, second: true }))
    winScroll > 900 && setContent(prev => ({ ...prev, third: true }))
    // setContent({first: winScroll > 400, second: winScroll > 800, third: winScroll > 1200})
  }, [winScroll])

  return (
    <MainBlock className={'fallback ' + opacity}>
      <HeaderBanner className='main' title='nav.personal_training'>
        <div className='header_new blue'>
          <h4 className='b900 uppercase relative'>
            <TieFitSVG className='absolute' />
            {t('header_banner.new_standard')}
          </h4>
          <p className='b900 uppercase'>35<span>€</span><span className='header_month'>/{t('header_banner.month')}</span></p>
        </div>
      </HeaderBanner>
      <div className='section margin_b_120_80'>
        <div className='rupor white'>
          <div className='rupor_trial relative'>
            <RedRuporSVG className='absolute' />
            <h6>17<span className='b900'>€</span></h6>
            <p className='b900'>3 {t('main.classes')}</p>
            <Link className='flex_center_center b900 white' to={RESERVE_ROUTE}>{t('main.register_trial')}</Link>
          </div>
          <div className='rupor_book'>
            <p className='b900 grey'>{t('main.connected_results')}</p>
            <Link className='flex_center_center light_grey_button b900 green' to={PRICE_ROUTE}>{t('main.book_class')}</Link>
          </div>
        </div>
        <div className='rupor_member center'>
          <h6 className='b900 grey'>{t('main.number_memberships')}</h6>
          <div className="grey_line">
            <div className="green_line"></div>
          </div>
          <p className='b900 blue uppercase'>76%{t('main.sold')}</p>
        </div>
      </div>
      {content.first && <ImageDescription imgSrc={add_01} title='nav.personal_training' descript='header_banner.35_minute_high' link={TRAIN_ROUTE} />}
      {content.second &&
        <>
          <div className='section flex_center_bet main_icons center'>
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
          <img src={require("../img/patterns/pattern_bg_1_3.png")} alt="" />
          <div className='section main_wow margin_b_60_30 center'>
            <article className='flex_center_center blue'>
              <h2 className='b900 uppercase'>{t('nav.personal_training')}</h2>
              <p className='b900 uppercase relative'>
                <TieWowSVG className='absolute' />
                35<span>€</span><span className='header_month'>/{t('header_banner.month')}</span></p>
            </article>
            <h2 className='b900 blue'>{t('main.how_is_it_possible')}</h2>
          </div>
        </>}
      {content.third && <>
        <ImageDescription imgSrc={add_02} title='main.connected_training_system' descript='main.never_before_has_digital' link={TRAIN_ROUTE} />
        <ImageDescription className='right_img' imgSrc={add_03} title='main.training_by_science' descript='main.the_milonizer_can_determine' link={TRAIN_ROUTE} />
      </>}

      <img src={require("../img/patterns/pattern_bg_1_3.png")} alt="" />

      <CommunityArticle className='alignCenter' title='main.pick_a_day' descript='header_banner.training_becomes' />
      <CommunityArticle title='35fit_community' subTitle={true} descript='header_banner.training_becomes' />
      <InstaImages />

    </MainBlock>
  )
}
export default Main      