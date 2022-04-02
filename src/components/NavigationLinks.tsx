import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const NavigationLinks = ({ links, bold, color }) => {
  const { t } = useTranslation()
  return (
    <>
      {links.map(({ route, dictionary }) =>
        <li key={dictionary}>
          <Link
            to={route}
            className={bold}
            style={{
              color: useLocation().pathname == route
                ? '#000044'
                : color,
            }}
          >
            {t(dictionary)}
          </Link>
        </li>
      )}
    </>
  )
}
