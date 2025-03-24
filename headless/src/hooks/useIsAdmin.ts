import { useSelector } from 'react-redux'
import { RootState } from 'store'

export const useIsAdmin = () => {
  return useSelector((state: RootState) => state.databaseUser.isAdmin)
}
