import React from "react";
import { PROMO_FEATURES_ENABLED } from "../config/promoConfig";

export const PromotionalBanner = () => {
  // TOGGLE CONTROL: Now controlled by centralized config
  // Change PROMO_FEATURES_ENABLED in src/config/promoConfig.js
  const BANNER_ENABLED = PROMO_FEATURES_ENABLED;

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

  const handleBannerClick = () => {
    const promosSection = document.getElementById('promos');
    if (promosSection) {
      // Calculate offset for fixed menu bar
      const menuBar = document.getElementById('menu');
      const menuHeight = menuBar ? menuBar.offsetHeight : 80; // fallback to 80px
      const promotionalBannerHeight = PROMO_FEATURES_ENABLED ? 50 : 0;
      const totalOffset = menuHeight + promotionalBannerHeight + 20; // 20px for spacing
      
      const targetPosition = promosSection.offsetTop - totalOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`promotional-banner ${BANNER_ENABLED ? '' : 'banner-disabled'}`} onClick={handleBannerClick} style={{cursor: 'pointer'}}>
      <div className="banner-content">
        <div className="scrolling-wrapper">
          <div className="scrolling-content">
            {bannerItems.map((item, index) => (
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