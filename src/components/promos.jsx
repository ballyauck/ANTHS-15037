import React from "react";
import { PROMO_FEATURES_ENABLED } from "../config/promoConfig";

export const Promos = (props) => {
  // TOGGLE CONTROL: Now controlled by centralized config
  // Change PROMO_FEATURES_ENABLED in src/config/promoConfig.js
  const PROMOS_ENABLED = PROMO_FEATURES_ENABLED;

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
                  <a 
                    href={`promo${i + 1}.html`}
                    className="promo-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <div className="promo-icon">
                      <i className={d.icon}></i>
                    </div>
                    <div className="promo-content">
                      <h3>{d.title}</h3>
                      <p className="promo-description">{d.description}</p>
                    </div>
                    <div className="promo-bottom">
                      <div className="promo-offer">
                        <span className="offer-text">{d.offer}</span>
                        {d.discount && (
                          <span className="discount-badge">{d.discount}</span>
                        )}
                      </div>
                      <p className="promo-terms">{d.terms}</p>
                    </div>
                  </a>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};