import store from 'store'
import { messageModal, unsetLoginModal } from 'slices/modal.slice'

export const errorModalMessage = (error: any) => {
  // const { message } = error?.response?.data
  // let msgString = ''
  // if (message && Array.isArray(message) && message?.length > 0) {
  //   msgString = message.map((i: any) => (i?.msg ? i.msg : i)).join(', ')
  // }
  const message = error?.response?.data?.message ?? 'Unexpected Error!'

  const msgString = Array.isArray(message)
    ? message.map((i: any) => i?.msg ?? i).join(', ')
    : message
  store.dispatch(unsetLoginModal())
  store.dispatch(messageModal(msgString))
  console.error(error?.response?.data)
}
