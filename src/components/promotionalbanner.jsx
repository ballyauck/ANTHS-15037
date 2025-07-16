import React, { useState } from "react";

export const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const bannerItems = [
    {
      type: "text",
      content: "¡ 24/7 Emergency Electrical Services Available"
    },
    {
      type: "text", 
      content: "<à Residential & Commercial Electrical Solutions"
    },
    {
      type: "text",
      content: " Licensed & Insured Electricians"
    },
    {
      type: "text",
      content: "=Þ Call Now: (555) 123-POWER"
    },
    {
      type: "text",
      content: "=¡ Smart Home Automation Specialists"
    },
    {
      type: "text",
      content: "=' Panel Upgrades & Rewiring Services"
    }
  ];

  if (!isVisible) return null;

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
        <button 
          className="banner-close" 
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};