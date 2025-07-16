import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { PromotionalBanner } from "./components/promotionalbanner";
import { Header } from "./components/header";
import { Solutions } from "./components/solutions";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Promos } from "./components/promos";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { PROMO_FEATURES_ENABLED } from "./config/promoConfig";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
  offset: function(anchor, toggle) {
    // Calculate dynamic offset for fixed menu bar and promotional banner
    const menuBar = document.getElementById('menu');
    const menuHeight = menuBar ? menuBar.offsetHeight : 80; // fallback to 80px
    const bannerHeight = PROMO_FEATURES_ENABLED ? 50 : 0;
    return menuHeight + bannerHeight + 20; // 20px for spacing
  }
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <PromotionalBanner />
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Solutions data={landingPageData.Features} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Promos data={landingPageData.Promos} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
