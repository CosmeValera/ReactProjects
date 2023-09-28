import React from "react"
import memesData from "../memesData.jsx"

export function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState(memesData)
    

    /*
        If here, you typed this: `setAllMemes(data.data.memes);`
        Then you would write this: `const memesArray = allMemes;` in getMemeImage().
    */
    React.useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes")
        .then(result=> result.json())
        .then(result=> {
            console.log("effect ran")
            setAllMemes(result);
            })
    }, []);
    
    /*
      // USE EFFECT 2nd option, only changing the value of data.data.memes
    */
    // React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then((data) => {
    //             console.log(data.data.memes)
    //             // Update only the memes array within data.data
    //             setAllMemes((prevAllMemes) => ({
    //             ...prevAllMemes,
    //             data: {
    //                 ...prevAllMemes.data,
    //                 memes: data.data.memes,
    //             },                
    //             }));
    //         });
    // }, [])
    
    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below (3d option):
    */
    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // }, [])
    

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(meme)
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))

        /**SECOND WAY OF DOING IT */
        // setMeme((prevMeme) => {return {
        //     ...prevMeme,
        //     [name]: value
        // }})
    }
    
    function getMemeImage() {
        const memesArray = allMemes.data.memes
        console.log(memesArray)
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    name="topText"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    name="bottomText"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}