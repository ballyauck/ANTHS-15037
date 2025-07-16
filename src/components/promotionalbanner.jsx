import React from "react";

export const PromotionalBanner = () => {
  // TOGGLE CONTROL: Set to true/1 to enable banner, false/0 to disable banner
  // This is the main control for showing/hiding the promotional banner
  const BANNER_ENABLED = true; // Change this to false to disable the banner completely

  const bannerItems = [
    {
      type: "multimedia",
      content: (
        <span>
          <img 
            src="/img/Logo_2x_TP.png" 
            alt="Logo" 
            style={{height: '20px', marginRight: '8px', verticalAlign: 'middle'}}
          />
          24/7 Emergency Electrical Services ⚡
        </span>
      )
    },
    {
      type: "text",
      content: "🏠 Residential & Commercial Solutions"
    },
    {
      type: "multimedia", 
      content: (
        <span>
          ✅ Licensed & Insured 
          <strong style={{marginLeft: '10px', color: '#FFE082'}}>Call: (555) 123-POWER</strong>
        </span>
      )
    },
    {
      type: "text",
      content: "💡 Smart Home Automation Specialists"
    },
    {
      type: "multimedia",
      content: (
        <span>
          🔧 Panel Upgrades 
          <span style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '3px', marginLeft: '8px'}}>
            FREE QUOTES
          </span>
        </span>
      )
    },
    {
      type: "text",
      content: "⭐ Trusted by 1000+ Local Customers"
    }
  ];

  // If banner is disabled, return null (completely hidden)
  if (!BANNER_ENABLED) return null;

  return (
    <div className="promotional-banner">
      <div className="banner-content">
        <div className="scrolling-wrapper">
          <div className="scrolling-content">
            {bannerItems.concat(bannerItems).map((item, index) => (
              <span key={index} className="banner-item">
                {item.content}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};