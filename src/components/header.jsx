import React from "react";
import { PROMO_FEATURES_ENABLED } from "../config/promoConfig";

export const Header = (props) => {
  // Calculate the total height of fixed elements above the hero
  const menuBarHeight = 80; // Approximate menu bar height
  const promoHeight = PROMO_FEATURES_ENABLED ? 50 : 0;
  const totalFixedHeight = menuBarHeight + promoHeight;

  const headerStyle = {
    marginTop: `${totalFixedHeight}px`,
    position: 'relative'
  };

  const introStyle = {
    backgroundPosition: 'center center',
    minHeight: 'calc(100vh + 50px)', // Increased to show more of background
    paddingTop: '150px', // Reduced by 50px to move content up
    paddingBottom: '0' // Removed bottom padding to show more of background
  };

  return (
    <header id="header" style={headerStyle}>
      <div className="intro" style={introStyle}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 intro-text">
                <h1 style={{
                  fontSize: '54px', 
                  lineHeight: '1.2', 
                  color: '#f8825a',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  display: 'inline-block'
                }}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p style={{
                  color: '#f8825a', 
                  whiteSpace: 'pre-line', 
                  fontSize: '22px', 
                  lineHeight: '1.4', 
                  maxWidth: '800px', 
                  margin: '20px auto 60px', 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '12px 18px',
                  borderRadius: '10px'
                }}>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#solutions"
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
