import React, { useState } from 'react'
// import { createStore, applyMiddleware } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
// import axios from 'axios'
import empty from 'img/empty_img.png'

const Flower: React.FC = () => {
  // function curry(f: { (a: any, b: any, c: any): any; length?: any; apply?: any }) {
  //     return function curried(this: any, ...args: any[]) {
  //         if (args.length >= f.length) {
  //             return f.apply(this, args)
  //         } else {
  //             return (...args2: any[]) => {
  //                 return curried.apply(this, args.concat(args2))
  //             }
  //         }
  //     }
  // }
  // function sum(a: number, b: number, c: number) {
  //     return a + b + c
  // }
  const [title, setTitle] = useState({ src: '', word: '', lang: '' }),
    [initial, setInitial] = useState({ value: '', code: '' }),
    [pointerEvents, setPointerEvents] = useState(''),
    languages = [
      { code: 'fr', lang: 'French' },
      { code: 'it', lang: 'Italian' },
      { code: 'de', lang: 'Dutch' },
      { code: 'ja', lang: 'Japanese' },
      { code: 'ru', lang: 'Russian' },
      { code: 'uk', lang: 'Ukrainian' },
      { code: 'ar', lang: 'Arabic' },
      { code: 'zh', lang: 'Chinese' },
    ],
    languageSet: Set<{ code: string; lang: string }> = new Set(),
    translationSet: Set<{ word: any; lang: string }> = new Set([
      { word: initial.value, lang: 'English' },
    ])

  const getImages = async (
    translationResults: Set<{ word: any; lang: string }>,
  ) => {
    // console.log(translationResults)
    for await (const item of translationResults) {
      fetch(`https://api.pexels.com/v1/search?query=${item.word}&per_page=1`, {
        headers: {
          Authorization:
            '563492ad6f91700001000001173c2e1310614e4c9a6b3f0fe56afc68',
          // "Host": "https://andreypost.github.io/35-fit/"
          Host: 'http://localhost:8080/',
        },
      })
        .then((response) => response.json())
        .then((items) =>
          setTitle({
            src: items.photos[0].src.medium,
            word: item.word,
            lang: item.lang,
          }),
        )
        .catch(() => setTitle({ src: empty, word: item.word, lang: item.lang }))
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
  const getTranslation = async (
    languageSet: Set<{ code: string; lang: string }>,
  ) => {
    for await (const item of languageSet) {
      await fetch(
        `https://api.mymemory.translated.net/get?q=${initial.value}&langpair=${initial.code}|${item.code}`,
      )
        .then((response) => response.json())
        .then((result) => {
          setInitial({
            value: result.responseData.translatedText,
            code: item.code,
          })
          translationSet.add({
            word: result.responseData.translatedText,
            lang: item.lang,
          })
        })
        .catch(() => getTranslation(languageSet))
    }
    // // const results = await Promise.all(wordSet)
    await getImages(translationSet).then(() => {
      setInitial({ value: '', code: '' })
      setPointerEvents('')
    })
  }

  const haldleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setPointerEvents('active')
    while (languageSet.size < languages.length) {
      languageSet.add(languages[Math.floor(Math.random() * languages.length)])
    }
    languageSet.add({ code: 'es', lang: 'English' }) // lang is 'Spanish', this API does not allow to put two the same languages at a time.
    getTranslation(languageSet)
  }
  return (
    <>
      <form action="get" id="wordForm" onSubmit={haldleSubmit}>
        <input
          type="text"
          name="initial"
          pattern="^[a-zA-Z]+$"
          required
          value={initial.value}
          onChange={(e) => setInitial({ value: e.target.value, code: 'en' })}
        />
        <button type="submit" className={pointerEvents}>
          submit
        </button>
      </form>
      <div>
        <h2 className="title">language: {title.lang + ', title: ' + title.word}</h2>
        Image: <img src={title.src} alt="" className="image" />
      </div>
    </>
  )
}
export default Flower



/* useEffect(() => {
  // first variant with generators, native js;
  let form = document.getElementById('wordForm'),
  title = document.querySelector('.title'),
  image = document.querySelector('.image'),
  lung = [{ 'code': 'fr', 'name': 'French' },
  { 'code': 'it', 'name': 'Italian' },
  { 'code': 'de', 'name': 'Dutch' },
  { 'code': 'ja', 'name': 'Japanese' },
  { 'code': 'ru', 'name': 'Russian' },
  { 'code': 'uk', 'name': 'Ukrainian' },
  { 'code': 'ar', 'name': 'Arabic' },
  { 'code': 'zh', 'name': 'Chinese' }],
  set = new Set([{ 'code': 'en', 'name': 'English' }]),
  initialValue = '',
  initialCode = 'en-GB',
  imgSrc = ''

async function* handleTextInput() {
  for await (let itemSet of set) {
      console.log(set)
      await fetch(`https://api.mymemory.translated.net/get?q=${initialValue}&langpair=${initialCode}|${itemSet.code}`)
          .then(response => response.json())
          .then(result => {
              initialValue = result.responseData.translatedText
              initialCode = itemSet.code
              fetch(`https://api.pexels.com/v1/search?query=${initialValue}&per_page=1`, {
                  "headers": {
                      "Authorization": "563492ad6f91700001000001173c2e1310614e4c9a6b3f0fe56afc68",
                      "Host": "https://andreypost.github.io/google-search/"
                  }
              })
                  .then(response => response.json())
                  .then(items => imgSrc = items.photos[0].src.medium)
                  .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      await new Promise(resolve => setTimeout(resolve, 2000))
      yield [initialValue, imgSrc, itemSet.name]
  }
}
form.onsubmit = (e) => {
  e.preventDefault()
  form.elements[1].style.pointerEvents = 'none'
  initialValue = form.initial.value

  while (set.size < lung.length - 3) {
      set.add(lung[Math.floor(Math.random() * lung.length)])
  }

  (async () => {
      for await (let [value, src, lung] of handleTextInput()) {
          title.innerHTML = `${lung} : ` + value
          image.src = src
      }
      form.elements[1].style.pointerEvents = 'unset'
      form.reset()
  })()
}
}, [])
*/