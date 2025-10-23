import { memo, useState } from 'react'
import { IAuth } from 'types/interface'

interface TestingCallbackProps<T> {
  sortUserByEmail: () => void
  userForUpdate: IAuth
}

const Square = ({ index, color, handleClick }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        width: '20px',
        height: '20px',
        margin: '10px',
        textAlign: 'center',
        color: 'white',
      }}
      onClick={() => {
        handleClick(index)
      }}
    >
      {index}
    </div>
  )
}

export const TestingCallback = memo(function TestingCalllback<T>({
  sortUserByEmail,
  userForUpdate,
}: TestingCallbackProps<T>) {
  // console.log('Testing Calllback is rerendering')
  const [colors, setColors] = useState(['red', 'green', 'red'])

  const handleClick = (index: number) => {
    setColors((prevColors) => {
      const newColors = [...prevColors]
      if (newColors[index] === 'green') {
        newColors[index] = 'red'
        return [...newColors, 'green']
      } else {
        newColors.splice(index, 1)
        return newColors
      }
    })
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: '60px',
        }}
      >
        {colors.map((color, i) => (
          <Square
            key={`${color}-${i}`}
            index={i}
            color={color}
            handleClick={handleClick}
          />
        ))}
      </div>
      <button
        className="flex_center_center additional_submit margin_b_60_30"
        onClick={sortUserByEmail}
      >
        Sort User By Email
      </button>
      <p>{userForUpdate?.id}</p>
    </>
  )
})
