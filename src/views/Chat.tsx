import React, { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { userType } from 'types/commonPropTypes'
// import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import { Spinner } from 'Spinner'
import { FirebaseAuthContext } from '../index'
import { useCollectionData } from 'react-firebase-hooks/firestore'

interface canvasProps {
  width: string
  height: string
  border: string
}

const Canvas = ({ width, height, border }: canvasProps) => {
  const contexRef = useRef<HTMLCanvasElement | null>(null)
  const handleContexLine = (e: any) => {
    const canvas = contexRef.current
    const ctx = canvas?.getContext('2d')
    ctx?.lineTo(e.clientX, e.clientY)
    ctx?.stroke()
    // context?.beginPath()
    // context?.arc(95, 50, 40, 0, 2 * Math.PI)
    // context?.fill()
  }
  const submitBlobData = async () => {
    const canvas = contexRef.current
    const imageBlob: any = await new Promise((resolve) =>
      canvas?.toBlob(resolve, 'image/png')
    )
    const formData = new FormData()
    formData.append('image', imageBlob, 'image.png')
    for (const d of formData) {
      console.log(d, imageBlob)
    }
  }
  return (
    <>
      <canvas
        width={width}
        height={height}
        style={{ border }}
        ref={contexRef}
        onMouseMove={handleContexLine}
      />
      <input type="button" value="send blob data" onClick={submitBlobData} />
    </>
  )
}

const Chat = ({ user }) => {
  // const { t } = useTranslation()
  const { firebase, firestore } = useContext(FirebaseAuthContext)
  const [chatMessage, setChatMessage] = useState('')
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )

  const handleSendChatMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(chatMessage)
    firestore.collection('messages').add({
      uid: user?.uid,
      displayName: user?.displayName,
      photoUrl: user?.photoURL,
      text: chatMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setChatMessage('')
  }
  if (loading) <Spinner />

  useEffect(() => {
    const sum = (a: number) => {
      let cs = a
      const f = (b: number) => {
        cs += b
        return f
      }
      f.toString = () => {
        return cs
      }
      return f
    }
    console.log(sum(2)(3)(-2)(26))
  }, [])
  return (
    <>
      <HeaderBanner>
        <Canvas width="100%" height="250px" border="1px solid red" />
        <></>
      </HeaderBanner>
      <h1>Chat</h1>
      <div>
        {messages?.map((item) => (
          <Fragment key={item.text}>
            <img src={item.photoUrl} alt="" style={{ borderRadius: '50%' }} />
            <p>
              {item.text} - {item.displayName}
            </p>
          </Fragment>
        ))}
      </div>
      <form action="" id="chatForm" onSubmit={handleSendChatMessage}>
        <textarea
          name=""
          id=""
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
          required
        />
        <button type="submit">send</button>
      </form>
    </>
  )
}
export default Chat

Chat.propTypes = {
  user: userType,
}
