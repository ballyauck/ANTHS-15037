import React from "react";
import { PROMO_FEATURES_ENABLED } from "../config/promoConfig";

export const Navigation = (props) => {
  return (
    <nav id="menu" className={`navbar navbar-default navbar-fixed-top ${PROMO_FEATURES_ENABLED ? 'with-promo-banner' : 'no-promo-banner'}`}>
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <img 
              src="/img/Banner_16x_TR_Trim&ColorEdit.png" 
              alt="CyberElectrix Logo" 
              style={{height: '60px', width: 'auto'}}
            />
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#features" className="page-scroll">
                Solutions
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            {PROMO_FEATURES_ENABLED && (
              <li>
                <a href="#promos" className="page-scroll">
                  Promos
                </a>
              </li>
            )}
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
