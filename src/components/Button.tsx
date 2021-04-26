import { useState } from 'react'

export const Buttom = (): any => {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((c) => c + 1)}>Count {count} </button>
}
