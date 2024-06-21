// import { useState, useEffect } from 'react'
import { IUser } from 'types/interface'
// import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { COACH_ROUTE } from 'utils/routes.constants'
import { HeaderBanner } from 'HeaderBanner'
import { ImageDescription } from 'components/ImageDescription'
import { FooterBanner } from 'FooterBanner'

import add_01 from '../img/adds/add_5_1.jpg'

const Team = ({ user }: IUser) => {
  // const { t } = useTranslation(),
  // useEffect(() => {
  // }, [])

  return (
    <main data-aos="fade" className="page_view">
      <HeaderBanner
        className="team"
        title="nav.team"
        description="header_banner.training_becomes"
      />

      <Link className="flex_center_center b900 grey" to={COACH_ROUTE}>
        Joyce&apos;s
      </Link>

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
    </main>
  )
}
export default Team
