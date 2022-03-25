import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Foot = styled.footer`
  .footer_connected {
    background-color: #000044;

    h3 {
      color: white;
    }

    .connected {
      padding-bottom: 60px;
      
      @media (max-width: 992px) {
        display: grid;
        
        padding-top: 60px;

      }

      @media (min-width: 993px) {
        padding-top: 120px;
      }
    }
  }
  .footer_touch {

    .touch {
      padding-top: 60px;
      
      @media (max-width: 992px) {
        padding-bottom: 120px;
        
      }
      
      @media (min-width: 993px) {
        padding-bottom: 50px;
      }
    }
    
  }

`

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <Foot>
      <div className="footer_connected">
        <div className="section connected">
          <article className='stay'>
              <h3>{t('footer.stay_connected')}</h3>
          </article>
          <article className='news'>

          </article>
          <article className='social'>

          </article>
        </div>
      </div>
      <div className="footer_touch">
        <ul className="section touch">
          <li><Link to="/Faq">{t('footer.Careers')}</Link></li>
          <li><Link to="/">{t('footer.Privacy')}</Link></li>
          <li><Link to="/">{t('footer.Terms')}</Link></li>
        </ul>
      </div>
    </Foot>
  )
}


const Footу = styled.footer`
  display: block;
  nav {
    max-width: 360px;
    ul {
      padding: 20px;
      text-align: center;
      a {
        display: inline-block;
        font-size: 18px;
        font-weight: 900;
        margin: 10px 0;
        color: #59b894;
        transition: color 0.2s;
        @media (hover: hover) {
          cursor: pointer;
          &:hover {
            color: #000044 !important;
          }
        }
      }
      .signout {
        font-size: 18px;
        font-weight: 900;
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;
        color: #737373;
        transition: color 0.2s;
        @media (hover: hover) {
          cursor: pointer;
          &:hover {
            color: #ff6376;
          }
        }
      }
    }
  }
`