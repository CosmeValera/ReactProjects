import React from "react";

import katieZaferes from "../images/katie-zaferes.png";
import starIcon from "../images/star.png";

export function Card(props) {
    return (
        <div className="card">
            <img src={katieZaferes} className="card-image"></img>
            <div className="card-rating">
                <img src={starIcon} className="card-star"></img>
                <span>{props.rate} </span>
                <span className="gray"> ({props.position}) ·</span>
                <span className="gray"> {props.country}</span>
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