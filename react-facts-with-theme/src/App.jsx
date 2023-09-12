import React from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main"

export default function App() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    function handleToggleDarkMode() {
        console.log("toggleDarkMode");
        setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
    }

    return (
        <div className="container">
            <Navbar darkMode={isDarkMode}  toggleDarkMode={handleToggleDarkMode}/>
            <Main darkMode={isDarkMode}/>
        </div>
    )
}