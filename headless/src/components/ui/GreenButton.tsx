import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const GreenButton = ({ route }) => {
  const { t } = useTranslation()
  return (
    <Link className="green_button flex_center_center b900 white" to={route}>
      {t('main.register_trial')}
    </Link>
  )
}
