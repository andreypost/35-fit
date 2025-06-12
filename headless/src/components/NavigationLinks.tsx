import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ILinks } from 'types/interface'

export const NavigationLinks = ({
  links,
  bold,
  color,
}: {
  links: ILinks['links']
  bold: string
  color: string
}) => {
  const location = useLocation()
  const { t } = useTranslation()
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
            {dictionary ? t(dictionary) : ''}
          </Link>
        </li>
      ))}
    </>
  )
}
