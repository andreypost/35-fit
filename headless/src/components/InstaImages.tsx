import styled from 'styled-components'
import { InstaSVG } from 'img/icons'

const Div = styled.div`
  .img_box {
    gap: 24px;
    margin-bottom: 60px;
    img {
      max-width: 290px;
      box-shadow: 0 24px 24px rgb(0 0 0 / 15%);
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

export const InstaImages = () => (
  <Div
    data-aos="fade-up"
    data-aos-duration="1000"
    className="insta_img section margin_b_120_80"
  >
    <div className="flex_center_around img_box wrap">
      <img src={require('../img/adds/comm_1.png')} alt="" />
      <img src={require('../img/adds/comm_2.png')} alt="" />
      <img src={require('../img/adds/comm_3.png')} alt="" />
      <img src={require('../img/adds/comm_1.png')} alt="" />
    </div>
    <a href="/" className="flex_center_end_col b900 green">
      <InstaSVG />
      @35fit_club
    </a>
  </Div>
)
