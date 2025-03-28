import axios from 'axios'
import { errorModalMessage } from './errorModalMessage'

export const apiEndpointCall = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  route: string,
  body?: any,
  firstLoad?: boolean,
  signal?: AbortSignal
): Promise<any> => {
  try {
    // console.log('signal: ', signal)
    const url = `${process.env.API_URL}/${route}`
    const config = {
      withCredentials: true,
      signal,
    }
    let result: any = null
    if (method === 'get' || method === 'delete') {
      result = await axios[method](url, config)
    } else {
      result = await axios[method](url, body, config)
    }
    // console.log(route, result)
    return result
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log('Request was canceled:', error.message)
      return
    }
    if (!firstLoad) {
      throw errorModalMessage(error)
    } else {
      throw error?.response?.data || { message: 'An unknown error occurred' }
    }
  }
}
