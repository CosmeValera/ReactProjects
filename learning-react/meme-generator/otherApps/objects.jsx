// App.js
import React from "react"

import Star from "./Star.js"

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false
    })
    
    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <Star isFavorite={contact.isFavorite} toggleFavorite={toggleFavorite}/>
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )
}

// Star.js
import React from 'react';

export default function Star(props) {
    let starIcon = props.isFavorite ? "star-filled.png" : "star-empty.png"
    
    return (
        <img 
            src={`../images/${starIcon}`} 
            className="card--favorite"
            onClick={props.toggleFavorite}
        />
    )
}