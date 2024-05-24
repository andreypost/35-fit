import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import { InstaSVG } from 'img/icons'

const Div = styled.div`
  background: #f5f5f5;
  section {
    padding-top: 80px;
    padding-bottom: 80px;
    .to_title {
      max-width: 400px;
      margin: auto;
      font-size: 21px;
      line-height: 32px;
    }
  }

  .img_box {
    gap: 24px;
    margin-bottom: 60px;
    img {
      max-width: 290px;
      border-radius: unset;
    }
  }
  a svg {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    fill: #004;
  }
  @media (max-width: 1023px) {
    .img_box {
      flex-flow: column;
    }
  }
`

export const TrainigOptions = () => {
  const { t } = useTranslation()
  return (
    <Div className="train_option">
      <section className="section ">
        <h3 className="to_title grey center">
          {t('main.never_before_has_digital')}
        </h3>
      </section>

      {/* <div className="flex_center_around img_box wrap">
        {['comm_1', 'comm_2', 'comm_3', 'comm_1'].map((n, i) => (
          <img
            key={`${n}_${i}`}
            data-aos="fade-up"
            data-aos-duration="1000"
            src={require(`../img/adds/${n}.png`)}
            className="shadow_radius"
            alt="adds image"
          />
        ))}
      </div>
      <a href="/" className="flex_center_end_col b900 green">
        <InstaSVG />
        @35fit_club
      </a> */}
    </Div>
  )
}
