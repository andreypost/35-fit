import { useContext, useEffect, useState } from 'react'
import { AppContext } from './../AppRouter'
import { useIsAdmin } from './../hooks/useIsAdmin'
import { IAuth } from 'types/interface'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { UserPrivileges } from 'utils/userRoles'
import { store } from 'store'
import { messageModal } from 'slices/modal.slice'

export const TestingRoles = () => {
  const { currentUser } = useContext(AppContext)
  const isAdmin = useIsAdmin()
  const [users, setAllUsers] = useState<IAuth[]>([])

  // const handleGetAllUsers = async <T extends React.FormEvent<HTMLFormElement>>(
  //   e: T
  // ): Promise<void> => {
  //   e.preventDefault()
  //   const response = await apiEndpointCall('get', 'user/users')
  //   if (response?.data) {
  //     setAllUsers(response.data)
  //   }
  // }
  useEffect(() => {
    const handleGetAllUsers = async (): Promise<void> => {
      const response = await apiEndpointCall('get', 'user/users')
      if (response?.data) {
        setAllUsers(response.data)
      }
    }
    handleGetAllUsers()
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
    if (users?.length > 0) {
      // const someUser = Math.floor(Math.random() * users.length)
      await apiEndpointCall(
        'patch',
        `user/${'a6c5e8b1-4c14-45bc-9f10-e492243e213e'}/privileges`,
        { grantedPrivileges, deniedPrivileges }
      )
      /* for (let i = 0; i < users.length; i++) {
          await apiEndpointCall('patch', `user/${users[i].id}/privileges`, {
            grantedPrivileges,
            deniedPrivileges,
          })
        } */
    } else {
      store.dispatch(messageModal('Ther is no user ID to update privileges'))
    }
  }

  const sorUserByEmail = () => {
    setAllUsers(() =>
      [...users].sort((a: any, b: any) => a?.email.localeCompare(b?.email))
    )
  }

  return (
    <>
      <h3 className="b900 blue">Additional Forms</h3>
      <div className="additional_forms margin_b_120_80">
        {/* <form id="allUsersForm" onSubmit={handleGetAllUsers}>
          <button
            type="submit"
            className="flex_center_center additional_submit b900 white"
            style={{
              opacity: currentUser ? 1 : 0.2,
              backgroundColor: currentUser ? '#59b894' : '#ff6376',
            }}
          >
            Get All Users
          </button>
        </form> */}
        <button
          className="flex_center_center additional_submit b900 white"
          style={{
            opacity: isAdmin && users?.length ? 1 : 0.2,
            backgroundColor: isAdmin && users?.length ? '#59b894' : '#ff6376',
          }}
          onClick={updateUserPrivileges}
        >
          Update User Privileges
        </button>
        <button
          className="flex_center_center additional_submit b900 white"
          onClick={sorUserByEmail}
        >
          Sort User By Email
        </button>
      </div>
      {users?.length > 0 &&
        users.map(({ email, id, grantedPrivileges, name }: IAuth) => (
          <ul key={id}>
            <li>
              <p>{name}</p>
              <p>{email}</p>
              <p>Granted Privileges: {grantedPrivileges}</p>
              <hr />
            </li>
          </ul>
        ))}
    </>
  )
}
