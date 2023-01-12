import React from "react";
import stackOfImages from "../images/stack_of_images.png";

function Hero() {
  return (
    <section className="hero">
      <img src={stackOfImages} className="hero--photo" />
      <h1>Online Experiences</h1>
      <p className="hero--header">
        Join unique interactive activities led by
        one-of-a-kind hosts-all without leaving home.
      </p>
    </section>
  );
}
  
export default Hero;