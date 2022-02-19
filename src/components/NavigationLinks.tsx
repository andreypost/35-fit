import { Link, useLocation } from 'react-router-dom'
import { TRAIN_ROUTE, PRICE_ROUTE, TEAM_ROUTE, SCHEDULE_ROUTE, CLUB_ROUTE, FAQ_ROUTE, } from 'utils/routes.constants'
import { useTranslation } from 'react-i18next'

const links = [
  { route: TRAIN_ROUTE, dictionary: 'nav.Training' },
  { route: PRICE_ROUTE, dictionary: 'nav.Pricing' },
  { route: SCHEDULE_ROUTE, dictionary: 'nav.Schedule' },
  { route: TEAM_ROUTE, dictionary: 'nav.Team' },
  { route: CLUB_ROUTE, dictionary: 'nav.Club' },
  { route: FAQ_ROUTE, dictionary: 'nav.Faq' },
]

export const NavigationLinks = () => {
  const { t } = useTranslation()

  return (
    <>
      {links.map(({ route, dictionary }) =>
        <li key={route}>
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
