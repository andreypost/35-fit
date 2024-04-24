import React from 'react'
import { linkTypes, styleTypes } from 'types/commonPropTypes'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const NavigationLinks = ({ links, bold, color }) => {
  const location = useLocation(),
    { t } = useTranslation()
  return (
    <>
      {links.map(({ route, dictionary }) => (
        <li key={dictionary}>
          <Link
            to={route}
            className={bold}
            style={{
              color: location.pathname == route ? '#000044' : color,
            }}
          >
            {t(dictionary)}
          </Link>
        </li>
      ))}
    </>
  )
}

NavigationLinks.propTypes = {
  links: linkTypes,
  bold: styleTypes,
  color: styleTypes,
}
