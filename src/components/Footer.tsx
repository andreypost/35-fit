import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FacebookSVG, InstaSVG, YoutubeSVG } from 'img/icons'

const Foot = styled.footer`
  h3 {
    color: white;
  }

  h6 {
    font-size: 12px;
    margin-bottom: 20px;
    color: #7FCBAE;
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

    .touch {
      display: grid;
      padding-top: 60px;
      
      @media (max-width: 992px) {
        max-width: 480px;
        gap: 40px;
        justify-content: center;
        padding-bottom: 120px;
        
      }
      
      @media (min-width: 993px) {
        justify-content: space-between;
        grid-template-columns: 15% 40% 20%;
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
            <h3>{t('footer.get_in_touch')}</h3>
          </article>
        </div>
        <ul>
          <li><Link to="/Faq">{t('footer.Careers')}</Link></li>
          <li><Link to="/">{t('footer.Privacy')}</Link></li>
          <li><Link to="/">{t('footer.Terms')}</Link></li>
        </ul>
      </div>
    </Foot>
  )
}