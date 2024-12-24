import { store } from 'store'
import { unsetAllModal, messageModal } from 'slices/modal.slice'
// import { useContext } from 'react'
// import { AppContext } from '../AppRouter'

export const errorModalMessage = (error: any) => {
  const message =
    (typeof error === 'string' && error) ||
    (error?.response?.data?.message ?? 'Unexpected Error!')

  const msgString = Array.isArray(message)
    ? message.map((i: any) => i?.msg ?? i).join(', ')
    : message
  store.dispatch(unsetAllModal())
  store.dispatch(messageModal(msgString))
  // if (error?.response?.data?.error === 'Unauthorized') {
  //   const { setCurrentUser } = useContext(AppContext)
  //   setCurrentUser(null)
  //   console.log('errorModalMessage: ', error?.response?.data?.message)
  // }
  console.error(error?.response?.data)
}
