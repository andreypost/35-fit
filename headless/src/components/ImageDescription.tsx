import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IImageLinkTitleDescrip } from 'types/interface'

const Div = styled.div`
  display: grid;
  align-items: center;
  gap: 35px;
  img {
    border-radius: 6px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.148126);
  }
  article {
    max-width: 480px;
    h3 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 40px;
    }
    a {
      max-width: 186px;
      transition: background-color 0.2s;
      &:hover {
        color: white;
        background-color: #59b894;
      }
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1.4fr 1fr;
    &.right_img {
      grid-template-columns: 1fr 1.4fr;
      img {
        order: 2;
      }
      article {
        order: 1;
      }
    }
    article {
      p {
        font-size: 21px;
        line-height: 32px;
      }
    }
  }
`

export const ImageDescription = ({
  className,
  imgSrc,
  title,
  description,
  link,
}: IImageLinkTitleDescrip) => {
  const { t } = useTranslation()

  return (
    <Div
      data-aos="fade-up"
      data-aos-duration="1000"
      className={`image_descript section margin_b_60_30 ${
        className ? className : ''
      }`}
    >
      <img src={imgSrc} alt="" />
      <article className="grey">
        <h3 className="b900">{t(title)}</h3>
        <p>{t(description)}</p>
        {link && (
          <Link
            className="flex_center_center light_grey_button green"
            to={link}
          >
            {t('main.discover_more')}
          </Link>
        )}
      </article>
    </Div>
  )
}
