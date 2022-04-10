import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { TDCLCHProps } from 'types/interface'

const Article = styled.article`
  h2 {
    max-width: 420px;
    font-size: 32px;
    span {
      font-size: 21px;
    }
  }
  p {
    max-width: 560px;
    font-size: 18px;
    line-height: 24px;
  }
  @media (max-width: 992px) {
    flex-flow: column;
    gap: 20px;
    &.alignCenter {
      align-items: center;
      text-align: center;
    }
  }
  @media (min-width: 993px) {
    p {
      line-height: 32px;
    }
  }
`

export const CommunityArticle = ({ className, title, subTitle, descript, coach }: TDCLCHProps) => {
  const { t } = useTranslation()

  return (
    <Article className={`section flex_start_bet margin_b_60_30 ${className}`}>
      <h2 className='b900 blue' style={{ lineHeight: subTitle ? '22px' : 'inherit' }}>{t(title)}
        {subTitle &&
          <>
            <br />
            <span>#{t('connected_to')}</span><span className='green'>{t('results')}</span>
          </>
        }
        {coach &&
          <>
            <br />
            <span>{coach}</span> <span>insta</span>
          </>
        }
      </h2>
      <p className='grey'>{t(descript)}</p>
    </Article>
  )
}
