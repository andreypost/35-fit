import { memo } from 'react'
import { IAuth } from 'types/interface'

interface TestingCallbackProps<T> {
  handleGetAllUsers: (url: string) => Promise<T> | void
  userForUpdate: IAuth
}

export const TestingCallback = memo(function TestingCalllback<T>({
  handleGetAllUsers,
  userForUpdate,
}: TestingCallbackProps<T>) {
  console.log('Testing Calllback is rerendering')
  return (
    <>
      <button
        className="flex_center_center additional_submit b900 white"
        onClick={() => handleGetAllUsers('user/users')}
      >
        Handle Get All Users
      </button>
      <p>{userForUpdate?.id}</p>
    </>
  )
})
