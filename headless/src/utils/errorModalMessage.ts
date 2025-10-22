import { store } from 'store'
import { unsetAllModal, messageModal } from 'slices/modal.slice'
import { resetDatabaseUser } from 'slices/databaseUser.slice'

export const errorModalMessage = (error: any) => {
  const message =
    (typeof error === 'string' && error) ||
    (error?.response?.data?.message ?? 'Unexpected Error!')

  const msgString = Array.isArray(message)
    ? message.map((i: any) => i?.msg ?? i).join(', ') + '.'
    : message

  store.dispatch(unsetAllModal())
  setTimeout(() => store.dispatch(messageModal(msgString)), 500)

  if (
    msgString?.includes('Invalid or expired token!') ||
    msgString?.includes('User not found.') ||
    msgString?.includes('You must login first!')
  ) {
    store.dispatch(resetDatabaseUser())
  }

  console.error('error: ', error?.response?.data)
  return error?.response?.data
}
