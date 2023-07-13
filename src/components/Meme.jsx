import { useEffect, useState } from "react"

export default function Meme(){
    const [allMemes, setAllMemes] = useState([])
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    // console.log(meme)
    function handleChange(e){
        const {name, value} = e.target

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    function handleClick(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: allMemes[randomNumber].url
        }))
    }

    return(
        <main>
            <div className="form">
                <input
                    type="text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Get a new meme image 🖼</button>

            </div>
            <div className="meme">
                <h3 className="meme--top_text">{meme.topText}</h3>
                <img src={meme.randomImage} alt="Meme Photo" />
                <h3 className="meme--bottom_text">{meme.bottomText}</h3>
            </div>
        </main>
    )
}