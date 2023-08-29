import React from "react"

export default function Contact(props) {
    /**
     * Challenge: Fix the code below to use the `props`
     * object values in place of the hardcoded values below
     */
    return (
        <div className="contact-card">
            <img src={props.img}/>
            <h3>{props.name}</h3>
            <div className="info-group">
                <img src="./images/phone-icon.png" />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img src="./images/mail-icon.png" />
                <p>{props.email}</p>
            </div>
        </div>
    )
}


/* 
//DESTRUCTURING props 
const person = {
    img: "./images/mr-whiskerson.png",
    name: "Mr. Whiskerson",
    phone: "(800) 555-1234",
    email: "mr.whiskaz@catnap.meow"
}

const {img, name} = person
console.log(name)

// In this case for instance you could use this->
export default function Contact({img, name, phone, email}) {
    // now you use here img, name phone and email
}
*/