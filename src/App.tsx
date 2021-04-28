import React, { useEffect, useState } from "react";
import empty from './img/empty_img.png'
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
        [initial, setInitial] = useState({ value: '', code: '' }),
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
        translationSet: Set<{ word: any; lang: string; }> = new Set([{ word: initial.value, lang: 'English' }])

    const getImages = async (translationResults: Set<{ word: any; lang: string; }>) => {
        console.log(translationResults)
        for await (const item of translationResults) {
            fetch(`https://api.pexels.com/v1/search?query=${item.word}&per_page=1`, {
                "headers": {
                    "Authorization": "563492ad6f91700001000001173c2e1310614e4c9a6b3f0fe56afc68",
                    "Host": "https://andreypost.github.io/35-fit/"
                    // "Host": "http://localhost:8080/"
                }
            })
                .then(response => response.json())
                .then(items => setTitle({ src: items.photos[0].src.medium, word: item.word, lang: item.lang }))
                .catch(() => setTitle({ src: empty, word: item.word, lang: item.lang }))
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
    }

    const getTranslation = async (languageSet: Set<{ code: string; lang: string; }>) => {
        for await (const item of languageSet) {
            await fetch(`https://api.mymemory.translated.net/get?q=${initial.value}&langpair=${initial.code}|${item.code}`)
                .then(response => response.json())
                .then(result => {
                    setInitial({ value: result.responseData.translatedText, code: item.code })
                    translationSet.add({ word: result.responseData.translatedText, lang: item.lang })
                })
                .catch(() => getTranslation(languageSet))
        }
        // // const results = await Promise.all(wordSet)
        getImages(translationSet)
            .then(() => {
                setInitial({ value: '', code: '' })
                setPointerEvents('')
            })
    }

    const haldleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setPointerEvents('active')
        while (languageSet.size < languages.length) {
            languageSet.add(languages[Math.floor(Math.random() * languages.length)])
        }
        languageSet.add({ 'code': 'es', 'lang': 'English' })  // lang is 'Spanish', this API does not allow to put two the same languages at a time.
        getTranslation(languageSet)
    }

    return (
        <>
            <form action="get" id="wordForm" onSubmit={haldleSubmit}>
                <input type="text" name="initial" pattern="^[a-zA-Z]+$" required value={initial.value} onChange={e => setInitial({ value: e.target.value, code: 'en' })} />
                <button type="submit" className={pointerEvents}>submit</button>
            </form>
            <div>
                <h2 className="title">{title.lang + '  ' + title.word}</h2>
                Image: <img src={title.src} alt="" className="image" />
            </div>
        </>
    )
}
