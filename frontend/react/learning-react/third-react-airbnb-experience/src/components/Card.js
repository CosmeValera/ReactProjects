import React from "react";

export function Card(props) {
    console.log(props);
    let badgeText = '';
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT";
    } else if (props.location === 'Online') {
        badgeText = "ONLINE";
    }

    return (
        <div className="card">
            {badgeText && <div className="card--badge">{badgeText}</div>}
            <img src= {"../images/"+props.coverImg} className="card-image" alt=""></img>
            <div className="card-rating">
                <img src={"../images/star.png"} className="card-star" alt=""></img>
                <span>{props.stats.rating}</span>
                <span className="gray"> ({props.stats.reviewCount}) ·</span>
                <span className="gray"> {props.location}</span>
            </div>
            <div className="card-text">
                <p>{props.title}</p>
            </div>
            <div className="card-price">
                <p><span className="bold">From ${props.price}</span> / person</p>
            </div>
        </div>
    );
}