import React from "react"

export default function WindowTracker() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    
    React.useEffect(() => {
        function handleResize() {
            console.log("Resized")
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, [])
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
