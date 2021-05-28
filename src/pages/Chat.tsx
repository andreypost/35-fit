import React, { useContext, useEffect, useState } from 'react'
import './main.scss'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'
import { FirebaseAuthContext } from '..'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Chat = (): any => {
  const { t } = useTranslation()
  const { firebase, auth, firestore } = useContext(FirebaseAuthContext)
  const [user] = useAuthState(auth)
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setChatMessage('')
  }


  // useEffect(() => {



  // }, [])
  return (
    <>
      <Header>
        <>
          <h1>{t('nav.Personal training')}</h1>
          <div>
            <svg className="tie">
              <use xlinkHref="#tie_fit"></use>
            </svg>
          </div>
        </>
      </Header>
      <h1>Chat</h1>
      <div>
        {messages?.map(item =>
          <p key={item.text}>{item.text} - {item.displayName}</p>
        )}
      </div>
      <form action="" id="chatForm" onSubmit={handleSendChatMessage}>
        <textarea name="" id="" onChange={e => setChatMessage(e.target.value)} value={chatMessage} required />
        <button type="submit">send</button>
      </form>

    </>
  )
}
export default Chat
