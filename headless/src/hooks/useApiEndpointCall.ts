// import { useContext } from 'react'
import axios from 'axios'
// import { AppContext } from '../AppRouter'
import { useAppDispatch } from 'roothooks'
import { spinnerIsVisibile } from 'slices/action.slice'
// import { resetDatabaseUser } from 'slices/databaseUser.slice'
import { errorModalMessage } from 'utils/errorModalMessage'

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export const useApiEndpointCall = () => {
  const dispatch = useAppDispatch()
  //   const { setCurrentUser } = useContext(AppContext)

  return async function apiEndpointCall<T = any>(
    method: HttpMethod,
    route: string,
    body?: any,
    firstLoad?: boolean,
    signal?: AbortSignal
  ): Promise<T> {
    try {
      dispatch(spinnerIsVisibile(true))
      const url = `${process.env.API_URL}/${route}`
      const config = { withCredentials: true, signal }

      const result =
        method === 'get' || method === 'delete'
          ? await axios[method](url, config)
          : await axios[method](url, body, config)

      console.log('useApiEndpointCall Results: ', route, result.data)

      return result as T
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request was canceled:', error.message)
        return Promise.reject(error)
      }

      //   if ( \\ this logic is implemented in errorModalMessage component
      //     error?.response?.data?.message.includes('Invalid or expired token!')
      //   ) {
      //     //   dispatch(resetDatabaseUser()) // or
      //     setCurrentUser(null)
      //   }

      if (!firstLoad) {
        throw errorModalMessage(error)
      } else {
        throw error?.response?.data ?? { message: 'An unknown error occurred' }
      }
    } finally {
      // dispatch(spinnerIsVisibile(false))
      setTimeout(() => dispatch(spinnerIsVisibile(false)), 500)
    }
  }
}
