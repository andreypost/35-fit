import { memo } from 'react'
import { IAuth } from 'types/interface'

interface TestingCallbackProps<T> {
  sortUserByEmail: () => void
  userForUpdate: IAuth
}

export const TestingCallback = memo(function TestingCalllback<T>({
  sortUserByEmail,
  userForUpdate,
}: TestingCallbackProps<T>) {
  // console.log('Testing Calllback is rerendering')
  return (
    <>
      <button
        className="flex_center_center additional_submit b900 white"
        onClick={sortUserByEmail}
      >
        Sort User By Email
      </button>
      <p>{userForUpdate?.id}</p>
    </>
  )
})
