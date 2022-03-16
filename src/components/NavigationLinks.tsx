import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



export const NavigationLinks = ({ links }) => {
  const { t } = useTranslation()
  return (
    <>
      {links.map(({ route, dictionary }) =>
        <li key={dictionary}>
          <Link
            to={route}
            style={{
              color: useLocation().pathname.includes(route)
                ? '#000044'
                : '#737373',
            }}
          >
            {t(dictionary)}
          </Link>
        </li>
      )}
    </>
  )
}
