// import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { IUser } from 'types/interface'
// import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { COACH_ROUTE } from 'utils/routes.constants'
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'
import { FooterBanner } from 'FooterBanner'

import add_01 from '../img/adds/add_5_1.jpg'

const Main = styled.main`
  .coach_section {
    row-gap: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    a {
      border-radius: 6px;
      transition: transform 0.5s, box-shadow 0.2s;
      background: #fff;
      article {
        margin: 20px 0 0 40px;
        h4 {
          font-size: 24px;
        }
        p {
          font-size: 14px;
        }
      }
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
    }
  }
  @media (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`

const Team = ({ user }: IUser) => {
  // const { t } = useTranslation(),
  // useEffect(() => {
  // }, [])

  return (
    <Main data-aos="fade" className="page_view">
      <HeaderBanner
        className="team"
        title="nav.team"
        description="header_banner.training_becomes"
      />
      <section className="section coach_section flex_center_center wrap">
        {[
          { name: 'Joyce Hallow', position: 'Head Coach', img: 'p_5_1' },
          { name: 'John Wayne', position: 'Coach', img: 'p_5_2' },
          { name: 'Samantha Jade', position: 'Coach', img: 'p_5_3' },
          { name: 'Cameron Horner', position: 'Head Coach', img: 'p_5_4' },
          { name: 'Marvin', position: 'Coach', img: 'p_5_5' },
          { name: 'Kayla', position: 'Coach', img: 'p_5_6' },
        ].map(({ name, position, img }) => (
          <Link to={COACH_ROUTE} data-aos="fade-up" data-aos-duration="1000">
            <article>
              <h4 className="b900 green">{name}</h4>
              <p className="grey">{position}</p>
            </article>
            <img src={require(`../img/person/${img}.jpg`)} alt="coach" />
          </Link>
        ))}
      </section>

      <img src={require('../img/patterns/pattern_bg_7_1.png')} alt="" />

      <ImageDescription
        className="right_img"
        imgSrc={add_01}
        title="team.we_do_have_coaches"
        description="header_banner.training_becomes"
      />
      <FooterBanner
        title="team.trial_foot_banner_title"
        price="17"
        subTitle="3 classes / 10 days"
      />
    </Main>
  )
}
export default Team
