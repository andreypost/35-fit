import { ILinks } from 'types/interface'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const NavigationLinks = ({ route: string }) => {
  const location = useLocation(),
    { t } = useTranslation()
  return (
    <Link className="flex_center_center b900 white" to={'route'}>
      {t('main.register_trial')}
    </Link>
  )
}
