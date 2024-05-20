import { ILinks } from 'types/interface'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const NavigationLinks = ({
  links,
  bold,
  color,
}: {
  links: ILinks['links']
  bold: string
  color: string
}) => {
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
            {dictionary ? t(dictionary) : ''}
          </Link>
        </li>
      ))}
    </>
  )
}
