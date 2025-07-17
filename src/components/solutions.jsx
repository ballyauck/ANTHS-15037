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
                      largeImage={`img/solutions/0${i + 1}-large.jpg`}
                      smallImage={`img/solutions/0${i + 1}-small.jpg`}
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