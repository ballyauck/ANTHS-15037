import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
              <div className="terms-note">
                <p>
                  <a href="/terms/maintenance-terms.html" className="terms-link">
                    * Terms and Conditions Apply
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginBottom: '-20px'}}></div>
        {/* Our Partners Section */}
        <div className="row partners-section">
          <div className="col-xs-12">
            <div className="partners-content">
              <h3>Our Partners</h3>
              <div style={{marginBottom: '80px'}}></div>
              <div className="partners-grid">
                <div className="partner-logo">
                  <img src="img/Yuccan Vector Transparent.png" alt="Partner 1" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 2" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 3" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 4" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 5" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 6" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 7" />
                </div>
                <div className="partner-logo">
                  <img src="img/Logo_2x_TP.png" alt="Partner 8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
