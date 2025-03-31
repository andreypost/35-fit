import { Fragment, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { IAuth } from 'types/interface'
import { useIsAdmin } from './../hooks/useIsAdmin'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { UserPrivileges } from 'utils/userRoles'
import { store } from 'store'
import { messageModal } from 'slices/modal.slice'
import { errorModalMessage } from 'utils/errorModalMessage'

const Div = styled.div`
  .privileges_button {
    flex-flow: column;
    span {
      font-weight: 400;
      font-size: 12px;
    }
  }
  .search_users_list {
    background-color: white;
    top: 55px;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 420px;
    z-index: 999;
    border: 2px solid #ff6376;
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    @media (hover: hover) {
      li {
        cursor: pointer;
      }
    }
  }
`

export const TestingRoles = () => {
  const [searchUsers, setSearchUsers] = useState<IAuth[] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const isAdmin = useIsAdmin()
  const [allUsers, setAllUsers] = useState<IAuth[]>([])
  const [userForUpdate, setUserForUpdate] = useState<IAuth>({})

  useEffect(() => {
    const urls = ['user/users', 'user/users', 'user/users', 'user/users']
    const handleGetAllUsers = async (path): Promise<void> => {
      const response = await apiEndpointCall('get', path)
      if (response?.data) {
        // setAllUsers(response.data)
        // setSearchUsers(response.data)
        return response?.data
      }
    }
    // handleGetAllUsers('')

    const parallelExecute = async (tasks, callback) => {
      await Promise.any(tasks.map((url) => handleGetAllUsers(url)))
        .then((response) => {
          setAllUsers(response.flat())
          // console.log('all: ', response.flat())

          // response.forEach((result) => {
          //   if (result.status === 'fulfilled') {
          //   } else if (result.status === 'rejected') {
          //     console.log('allSettled rejected: ', result.reason)
          //   }
          // })
        })
        .catch((error) => {
          console.error(error)
        })
    }
    // parallelExecute(urls, (res: any) => console.log(res))
  }, [])

  useEffect(() => {
    const sleep = async <T extends Function>(
      delay: number,
      func: T
    ): Promise<any> => {
      return new Promise((res) => setTimeout(() => res(func()), delay))
    }

    const maim = async (delay: number) => {
      console.log('now')
      await sleep(delay, () => console.log('delay: ', delay))
      await new Promise((res) => setTimeout(res, delay))
      console.log('triggers after both delays: ', delay)
    }

    // maim(2000)
  }, [])

  useEffect(() => {
    async function fetchUserAdnPost(userId: string) {
      try {
        const res = await apiEndpointCall('get', `file/users/${userId}`)
        console.log('try catch: ', res)
      } catch (error: any) {
        console.error(error)
      }
      // or
      await new Promise((res, rej) =>
        res(apiEndpointCall('get', `file/users/${userId}`))
      )
        .then((response) => console.log('response', response))
        .catch((error) => console.error('error', error))
        .finally(() => console.log('Finally done!'))
    }

    // fetchUserAdnPost('123')
  }, [])

  const updateUserPrivileges = async () => {
    const grantedPrivileges = UserPrivileges.Administrator
    const deniedPrivileges = UserPrivileges.None
    if (!isAdmin) {
      store.dispatch(
        messageModal('You do not have the rights to update privileges')
      )
      return
    }
    if (userForUpdate?.id) {
      // const someUser = Math.floor(Math.random() * users.length)
      await apiEndpointCall('patch', `user/${userForUpdate.id}/privileges`, {
        grantedPrivileges,
        deniedPrivileges,
      })
      setUserForUpdate({})
      // for (let i = 0; i < allUsers.length; i++) {
      //   await apiEndpointCall('patch', `user/${allUsers[i].id}/privileges`, {
      //     grantedPrivileges: UserPrivileges.ProjectCreator,
      //     deniedPrivileges,
      //   })
      // }
    } else {
      store.dispatch(messageModal('Ther is no user ID to update privileges'))
    }
  }

  const sorUserByEmail = () => {
    setAllUsers(() =>
      [...allUsers].sort((a: any, b: any) => a?.email.localeCompare(b?.email))
    )
  }

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timerId: any = null
    return (...args: Parameters<T>): void => {
      clearTimeout(timerId)
      timerId = setTimeout(() => func(...args), delay)
    }
  }

  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let lastCall = 0
    return function (this: any, ...args: Parameters<T>): void {
      const now = Date.now()
      if (now - lastCall >= delay) {
        func.apply(this, args)
        lastCall = now
      }
    }
  }

  const fetchUsersBySearch = async (searchQuery: string) => {
    if (searchQuery?.length < 2) {
      setSearchUsers(null)
      return
    }
    try {
      const response = await axios.get(`${process.env.API_URL}/user/search`, {
        params: { query: searchQuery },
        withCredentials: true,
      })
      if (response?.data) {
        setSearchUsers(response.data)
      }
    } catch (error: any) {
      errorModalMessage(error)
    }
  }

  const debouncedFetchSearchUsers = useCallback(
    // debounce(fetchUsersBySearch, 300),
    throttle(fetchUsersBySearch, 300),
    []
  )

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchQuery(value)
    debouncedFetchSearchUsers(value)
  }

  return (
    <Div>
      <h3 className="b900 margin_b_60_30 blue">Additional Forms</h3>
      <div className="additional_forms margin_b_120_80 relative">
        <fieldset className="margin_b_60_30">
          <legend>Search Query:</legend>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search user by name..."
            onChange={handleSearchInputChange}
          />
        </fieldset>
        {searchUsers && searchUsers?.length > 0 && (
          <ul className="search_users_list absolute">
            {searchUsers.map(({ email, grantedPrivileges, id }: IAuth) => (
              <Fragment key={email}>
                <li
                  onClick={() => {
                    setUserForUpdate({ email, id })
                    setSearchUsers([])
                    setSearchQuery('')
                  }}
                >
                  <p>email: {email}</p>
                  <p>Granted Privileges: {grantedPrivileges}</p>
                </li>
                <br />
              </Fragment>
            ))}
          </ul>
        )}
        <button
          className="flex_center_center additional_submit privileges_button b900 white"
          style={{
            opacity: isAdmin && userForUpdate?.email ? 1 : 0.2,
            backgroundColor:
              isAdmin && userForUpdate?.email ? '#59b894' : '#ff6376',
          }}
          onClick={updateUserPrivileges}
        >
          Update User Privileges
          <br />
          {userForUpdate?.email && <span>for: {userForUpdate.email}</span>}
        </button>
        <button
          className="flex_center_center additional_submit b900 white"
          onClick={sorUserByEmail}
        >
          Sort User By Email
        </button>
      </div>
      {allUsers?.length > 0 &&
        allUsers.map(({ email, id, grantedPrivileges, name }: IAuth, index) => (
          <ul key={index}>
            <li>
              <p>{name}</p>
              <p>{email}</p>
              <p>Granted Privileges: {grantedPrivileges}</p>
              <hr />
            </li>
          </ul>
        ))}
    </Div>
  )
}
