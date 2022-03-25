import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Foot = styled.footer`
  .footer_connected {
    background-color: #000044;

  }
  .footer_touch {
    
  }

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

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <Foot>
      <div className="footer_connected">
        <div className="section">

        </div>
      </div>
      <div className="footer_touch">
        <ul className="section">
          <li><Link to="/Faq">{t('footer.Careers')}</Link></li>
          <li><Link to="/">{t('footer.Privacy')}</Link></li>
          <li><Link to="/">{t('footer.Terms')}</Link></li>
        </ul>
      </div>
    </Foot>
  )
}
