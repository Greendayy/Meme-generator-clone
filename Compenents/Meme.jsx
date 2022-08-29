import React, { useState, useEffect } from "react";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const result = await res.json()
            console.log("result", result)
            setAllMemes(result.data.memes)
        }
        getMemes()
    }, [])



    function getMemeImage() {
        console.log("allMemes", allMemes)
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, randomImage: url
        }))
        console.log("meme",meme)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme, [name]: value
        }))
    }
    return (
        <main>
            <div className="form">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange} />

                <input
                    className="form-input"
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange} />

                <button className="form-botton" onClick={getMemeImage}>
                    Get a new meme image 🖼</button>
                
            </div>
            <div className="meme">
                <img className="meme-image" src={meme.randomImage} />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}