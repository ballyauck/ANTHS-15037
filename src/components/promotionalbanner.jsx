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
          ⚡Check out our current Promos!!⚡
        </span>
      )
    },
    {
      type: "text",
      content: "          "
    },
    {
      type: "multimedia",
      content: (
        <span>
          🔧 One-day residential & commercial switchboard replacement/upgrade for $399 excluding parts (Ends 31 August 2025); click for more info
        </span>
      )
    },
    {
      type: "multimedia",
      content: (
        <span>
          💡 Save on your power bill this winter with our LED downlight and batten replacement deal for between $20 & $45 per downlight, and between $60 & $80 per batten, flat rate (Ends 31 August 2025); click for more info
        </span>
      )
    },
    {
      type: "multimedia",
      content: (
        <span>
          ⏱️ Another power bill saver! Get our hot water cylinder timer fully installed for $149 flat rate (Ends 31 August 2025); click for more info
        </span>
      )
    },
    {
      type: "text",
      content: "          "
    },
    {
      type: "multimedia", 
      content: (
        <span>
          ✅ Guaranteed quality products & satisfaction on costs 😀 👍
          <strong style={{marginLeft: '10px', color: '#FFE082'}}> Call: 027 573 3478</strong>
        </span>
      )
    },
    {
      type: "multimedia", 
      content: (
        <span>
          💰 💳 Let us help you save on your power bill this winter and beyond 💲 💵
          <strong style={{marginLeft: '10px', color: '#FFE082'}}> Call: 027 573 3478</strong>
        </span>
      )
    },
    {
      type: "multimedia", 
      content: (
        <span>
          📱 🕿 📧 Contact us now to find out more
          <strong style={{marginLeft: '10px', color: '#FFE082'}}> Call: 027 573 3478</strong>
        </span>
      )
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