import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 intro-text">
                <h1 style={{fontSize: '54px', lineHeight: '1.2', color: '#f8825a'}}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p style={{color: '#f8825a', whiteSpace: 'pre-line', fontSize: '22px', lineHeight: '1.4', maxWidth: '900px', margin: '0 auto 60px', fontWeight: 'bold'}}>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
