import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>About Us</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive about-image-enlarged" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
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
                  <a href="/terms/maintenance-terms.html" className="terms-link" target="_blank" rel="noopener noreferrer">
                    * Terms and Conditions Apply
                  </a>
                  {" | "}
                  <a 
                    href="https://www.ewrb.govt.nz/registration/changes-to-electrical-worker-registration/registration-class-changes/" 
                    className="terms-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ** Requires Mains Parallel Endorsement
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
              <div style={{marginBottom: '40px'}}></div>
              <div className="partners-grid">
                {props.partners
                  ? props.partners.map((partner, i) => (
                      <a
                        key={`${partner.name}-${i}`}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-logo"
                        style={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          display: 'block'
                        }}
                      >
                        <img src={partner.image} alt={partner.name} />
                      </a>
                    ))
                  : "Loading partners..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
