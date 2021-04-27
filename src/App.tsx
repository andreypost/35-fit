import React, { useEffect, useState } from "react";
// import png from './img/header_main.png'
// import svg from './img/inlineSvg/main_header_back.svg'
// import { Buttom } from './components/Button'
// import { useEffect } from 'react'

export const App = (): any => {
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
        [initialValue, setInitialValue] = useState(''),
        [pointerEvents, setPointerEvents] = useState(''),
        languages = [{ 'code': 'fr', 'lang': 'French' },
        { 'code': 'it', 'lang': 'Italian' },
        { 'code': 'de', 'lang': 'Dutch' },
        { 'code': 'ja', 'lang': 'Japanese' },
        { 'code': 'ru', 'lang': 'Russian' },
        { 'code': 'uk', 'lang': 'Ukrainian' },
        { 'code': 'ar', 'lang': 'Arabic' },
        { 'code': 'zh', 'lang': 'Chinese' }],
        languageSet: Set<{ code: string; lang: string; }> = new Set(),
        translationSet: Set<{ word: any; lang: string; }> = new Set([{ word: initialValue, lang: 'English' }])

    let initialCode = 'en'

    const getImages = async (wordResults: Set<{ word: any; lang: string; }>) => {
        for await (const item of wordResults) {
            fetch(`https://api.pexels.com/v1/search?query=${item.word}&per_page=1`, {
                "headers": {
                    "Authorization": "563492ad6f91700001000001173c2e1310614e4c9a6b3f0fe56afc68",
                    "Host": "https://andreypost.github.io/35-fit/"
                    // "Host": "http://localhost:8080/"
                }
            })
                .then(response => response.json())
                .then(items => {
                    setTitle({ src: items.photos[0].src.medium, word: item.word, lang: item.lang })
                })
                .catch(err => console.log(err))
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
        setPointerEvents('')
    }

    const getTranslation = async () => {
        for await (const item of languageSet) {
            await fetch(`https://api.mymemory.translated.net/get?q=${initialValue}&langpair=${initialCode}|${item.code}`)
                .then(response => response.json())
                .then(result => {
                    setInitialValue(result.responseData.translatedText)
                    translationSet.add({ word: result.responseData.translatedText, lang: item.lang })
                    initialCode = item.code
                })
                .catch(() => getTranslation())
        }
        // const results = await Promise.all(wordSet)
        console.log(translationSet)
        getImages(translationSet)
        setInitialValue('')
    }

    const haldleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setPointerEvents('active')
        while (languageSet.size < languages.length - 1) {
            languageSet.add(languages[Math.floor(Math.random() * languages.length)])
        }
        getTranslation()
    }



    return (
        <>
            <form action="get" id="wordForm" onSubmit={haldleSubmit}>
                <input type="text" name="initial" pattern="^[a-zA-Z]+$" required value={initialValue} onChange={e => setInitialValue(e.target.value)} />
                <button type="submit" className={pointerEvents}>submit</button>
            </form>
            <div>
                <h2 className="title">{title.lang + '  ' + title.word}</h2>
                Image: <img src={title.src} alt="" className="image" />
            </div>
        </>
    )
}
