import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ILTDCLProps } from 'types/interface'

const Div = styled.div`
 
  
  @media (max-width: 992px) {
    flex-flow: column;
  }
  
  @media (min-width: 993px) {
    
  }
`

export const ImageDescription = ({ className, imgSrc, title, descript, link }: ILTDCLProps) => {
  const { t } = useTranslation()

  return (
    <Div className={`section flex_center_bet ${className}`}>
      <img src={imgSrc} alt="" />
      <article className='grey'>
        <h3 className='b900'>{t(title)}</h3>
        <p>{t(descript)}</p>
        {link && <Link className='flex_center_center light_grey_button green' to={link}>{t('main.discover_more')}</Link>}
      </article>
    </Div>
  )
}
