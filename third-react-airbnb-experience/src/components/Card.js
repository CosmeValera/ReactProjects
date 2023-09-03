import React from "react";

export function Card(props) {
    return (
        <div className="card">
            <img src= {"../images/"+props.image} className="card-image"></img>
            <div className="card-rating">
                <img src={"../images/star.png"} className="card-star"></img>
                <span>{props.rating} </span>
                <span className="gray"> ({props.reviewCount}) ·</span>
                <span className="gray"> {props.location}</span>
            </div>
            <div className="card-text">
                <p>{props.description}</p>
            </div>
            <div className="card-price">
                <p><span className="bold">From ${props.price}</span> / person</p>
            </div>
        </div>
    );
}