import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FacebookSVG, InstaSVG, LangArrowSVG, YoutubeSVG } from 'img/icons'

const Foot = styled.footer`
  h2 {
    font-weight: 900;
    color: white;
  }

  h6 {
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: #59B894;
  }

  p {
    font-size: 14px;
    color: #F5F5F5;
  }
  
  .footer_connected {
    background-color: #000044;

    .connected {
      display: grid;
      padding-bottom: 60px;

      p {
        margin-bottom: 40px;
      }

      #newsForm {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 20px;

        .input_box {
          display: grid;
          width: 100%;
          label {
            background-color: transparent;
          }
          input {
            &::placeholder {
              font-weight: 400;
              color: #E8E8E8;
            }
          }
        }
        button {
          width: 122px;
          color: #59B894;
        }
      }

      .social a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-top: 25px;
        
        svg {
          min-width: 24px;
        }

        span {
          width: 90%;
          height: 1px;
          background-color: #1B385C;
        }
      }
      
      @media (max-width: 992px) {
        max-width: 480px;
        gap: 40px;
        justify-content: center;
        padding-top: 60px;

        #newsForm {
          flex-flow: column;
          align-items: flex-start;
          button {
            width: 100%;
          }
        }
      }
      
      @media (min-width: 993px) {
        justify-content: space-between;
        grid-template-columns: 15% 40% 20%;
        padding-top: 120px;
      }
    }
  }

  .footer_touch {
    a {
      font-size: 14px;
      color: #59B894;
    }

    .touch {
      display: grid;
      margin-bottom: 160px;
      padding-top: 60px;

      .contacts {
        display: grid;
        gap: 60px;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 24px;
        svg {
          width: 12px;
          height: 18px;
          fill: #59B894;
          transform: rotate(-90deg);
        }
      }

      .phone {
        color: #F5F5F5;
      }

      .email {
        margin-bottom: 20px;
      }
      
      @media (max-width: 992px) {
        max-width: 480px;

        .get {
          margin-bottom: 30px;
        }

        .contacts {
          margin-bottom: 60px;
        }

        .partners {
          p {
            margin-bottom: 20px;
          }
        }
      }
      
      @media (min-width: 993px) {
        grid-template-columns: 15% 40% 20%;
        justify-content: space-between;

        .contacts {
          grid-template-columns: 1fr 1fr;
        }

        .partners {
          display: flex;
          flex-flow: column;
          a {
            margin-top: auto;
          }
        }
      }
    }
    
    .careers_terms {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: flex-end;
      gap: 60px;
      padding-bottom: 120px;
      
      a {
        font-weight: 700;
      }
      
      @media (min-width: 993px) {
        flex-flow: unset;
        gap: 38px;
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
            <h2>{t('footer.stay_connected')}</h2>
          </article>
          <article>
            <h6>{t('footer.newsletter')}</h6>
            <p>{t('footer.be_first_queue')}</p>
            <form action="" id="newsForm">
              <div className='input_box'>
                <label htmlFor="email" className='white_label'>{t('email_address')}</label>
                <input type="email" name="email" className='white_input part_radius' placeholder={t('enter_email_address')} required />
              </div>
              <button type="submit" className='white_input'>{t('footer.subscribe')}</button>
            </form>
          </article>
          <article className='social'>
            <h6>{t('footer.social')}</h6>
            <a href="">
              <FacebookSVG /><span />
            </a>
            <a href="">
              <InstaSVG /><span />
            </a>
            <a href="">
              <YoutubeSVG /><span />
            </a>
          </article>
        </div>
      </div>
      <div className="footer_touch">
        <div className="section touch">
          <article className='get'>
            <h2>{t('footer.get_in_touch')}</h2>
          </article>
          <div className='contacts'>
            <article>
              <h6>{t('footer.general')}</h6>
              <a href="tel:+3726669999" className='phone'>- 372 666 9999</a>
              <a href="mailto:info@35fit.com" className='email'>- info@35fit.com</a>
              <Link to="/Faq" className='white_input'>
                {t('footer.Careers')}
                <LangArrowSVG />
              </Link>
            </article>
            <article>
              <h6>{t('nav.club')}</h6>
              <a href="tel:+3726669999" className='phone'>- 372 666 9999</a>
              <a href="mailto:gonsiori@35fit.com" className='email'>- gonsiori@35fit.com</a>
              <Link to="/Faq" className='white_input'>
                {t('footer.contacts')}
                <LangArrowSVG />
              </Link>
            </article>
          </div>
          <article className='partners'>
            <h6>{t('footer.partners')}</h6>
            <p>{t('footer.search_engine')}</p>
            <Link to="/Faq" className='white_input'>
              {t('footer.become_partner')}
              <LangArrowSVG />
            </Link>
          </article>
        </div>
        <ul className="section careers_terms">
          <li><Link to="/Faq">{t('footer.Careers')}</Link></li>
          <li><Link to="/">{t('footer.Privacy')}</Link></li>
          <li><Link to="/">{t('footer.Terms')}</Link></li>
        </ul>
      </div>
    </Foot>
  )
}