import { Image } from "./image";
import React from "react";

export const Solutions = (props) => {
  console.log("Solutions component rendering with data:", props.data);
  return (
    <div id="solutions" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Solutions</h2>
          <p>
            Comprehensive electrical solutions for residential, commercial, and industrial needs.
            From smart home automation to industrial power systems.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      description={d.description}
                      largeImage={`img/portfolio/0${(i % 9) + 1}-large.jpg`}
                      smallImage={`img/portfolio/0${(i % 9) + 1}-small.jpg`}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};