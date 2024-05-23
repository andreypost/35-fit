import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useAppDispatch } from 'utils/hooks'
import { IChildrenTitleDescrip } from 'types/interface'
import { RedRuporSVG } from 'img/icons'

const Div = styled.div`
  max-width: 1440px;
  margin: auto auto -20px;
  padding: 0 20px;

  section {
    height: 440px;
    background: url(${require('../img/patterns/pattern_bg_footer_banner.png')})
        no-repeat center 360% / cover,
      #fff;
  }

  @media (max-width: 1023px) {
    section {
      h3 {
        // font-size: 16px;
      }
    }
  }

  @media (min-width: 1024px) {
    margin-bottom: -40px;
    section {
      // padding-top: 170px;
      h1 {
        // font-size: 48px;
      }
      h3 {
        // padding-bottom: 140px;
      }
    }
  }
`

export const FooterBanner = ({
  children,
  className,
  title,
  description,
}: IChildrenTitleDescrip) => {
  const dispatch = useAppDispatch(),
    { t } = useTranslation()

  useEffect(() => {}, [])

  return (
    <Div className={`footer_banner ${className}`}>
      <section className="flex_center_center_col shadow_radius">
        <RedRuporSVG className="absolute" />
        <h5 className="b900 blue">{t(title)}</h5>

        {description && <p className="grey">{t(description)}</p>}
        {children}
      </section>
    </Div>
  )
}
