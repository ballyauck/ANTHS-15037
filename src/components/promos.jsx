import React from "react";

export const Promos = (props) => {
  // TOGGLE CONTROL: Set to true/1 to enable promos section, false/0 to disable section
  // This is the main control for showing/hiding the promos section
  const PROMOS_ENABLED = true; // Change this to false to disable the section completely

  // If promos section is disabled, return null (completely hidden)
  if (!PROMOS_ENABLED) return null;

  return (
    <div id="promos" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Promos</h2>
          <p>
            Special offers and promotions on our electrical services. 
            Limited time deals for residential, commercial, and industrial clients.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-md-4">
                  <div className="promo-item">
                    <div className="promo-icon">
                      <i className={d.icon}></i>
                    </div>
                    <div className="promo-content">
                      <h3>{d.title}</h3>
                      <p className="promo-description">{d.description}</p>
                      <div className="promo-offer">
                        <span className="offer-text">{d.offer}</span>
                        {d.discount && (
                          <span className="discount-badge">{d.discount}</span>
                        )}
                      </div>
                      <p className="promo-terms">{d.terms}</p>
                    </div>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};