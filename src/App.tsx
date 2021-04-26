import React, { useState } from "react";
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
    const [title, setTitle] = useState(''),
        [srcImage, setSrcImage] = useState(''),
        [initialValue, setInitialValue] = useState(''),
        [pointerEvents, setPointerEvents] = useState(''),
        lung = [{ 'code': 'fr', 'lung': 'French' },
        { 'code': 'it', 'lung': 'Italian' },
        { 'code': 'de', 'lung': 'Dutch' },
        { 'code': 'ja', 'lung': 'Japanese' },
        { 'code': 'ru', 'lung': 'Russian' },
        { 'code': 'uk', 'lung': 'Ukrainian' },
        { 'code': 'ar', 'lung': 'Arabic' },
        { 'code': 'zh', 'lung': 'Chinese' }],
        codeSet = new Set(),
        wordSet = new Set()

    let initialCode = 'en'

    const getImages = async (wordResults) => {
        for await (const word of wordResults) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            fetch(`https://api.pexels.com/v1/search?query=${word}&per_page=1`, {
                "headers": {
                    "Authorization": "563492ad6f91700001000001173c2e1310614e4c9a6b3f0fe56afc68",
                    // "Host": "https://andreypost.github.io/google-search/"
                    "Host": "http://127.0.0.1:5500/index.html"
                }
            })
                .then(response => response.json())
                .then(items => {
                    setSrcImage(items.photos[0].src.medium)
                    setTitle(word)
                })
                .catch(err => console.log(err))
        }
        setPointerEvents('')
        console.log(wordResults)
    }

    const getTranslation = async () => {
        // const getTranslation = async (set: Set<{ code: string; lung: string; }>) => {
        wordSet.add(initialValue)
        for await (const item of codeSet) {
            const job = fetch(`https://api.mymemory.translated.net/get?q=${initialValue}&langpair=${initialCode}|${item.code}`)
                .then(response => response.json())
                .then(result => {
                    const translatedWord = result.responseData.translatedText
                    setInitialValue(translatedWord)
                    initialCode = item.code
                    return translatedWord
                })
                .catch(() => getTranslation())
            wordSet.add(job)
        }
        const results = await Promise.all(wordSet)
        console.log(results)
        await getImages(results)
    }

    const haldleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setPointerEvents('active')
        while (codeSet.size < lung.length) {
            codeSet.add(lung[Math.floor(Math.random() * lung.length)])
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
                <h2 className="title">Title: {title}</h2>
                Image: <img src={srcImage} alt="" className="image" />
            </div>
        </>
    )
}
