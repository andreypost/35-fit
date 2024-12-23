import axios from 'axios'
import { errorModalMessage } from './errorModalMessage'

export const apiEndpointCall = async (
  method: 'get' | 'post' | 'put' | 'delete',
  route: string,
  body: any = null
) => {
  try {
    const url = `${process.env.API_URL}/${route}`
    const config = {
      withCredentials: true,
    }
    let result: any = null
    if (method === 'get' || method === 'delete') {
      result = await axios[method](url, config)
    } else {
      result = await axios[method](url, body, config)
    }
    console.log(route, result)
    return result
  } catch (error: any) {
    throw errorModalMessage(error)
  }
}
