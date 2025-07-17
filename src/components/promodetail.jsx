import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const PromoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Placeholder data for promo details
  const promoData = {
    1: {
      title: "Electrical Installation Package",
      price: "$299",
      originalPrice: "$399",
      discount: "25% OFF",
      images: [
        "img/promo1-detail-1.jpg",
        "img/promo1-detail-2.jpg", 
        "img/promo1-detail-3.jpg"
      ],
      description: "Complete electrical installation package for residential homes. Includes wiring, outlets, switches, and basic lighting fixtures.",
      features: [
        "Professional installation by certified electricians",
        "Up to 10 electrical outlets",
        "Basic lighting fixtures included",
        "Safety inspection and testing",
        "1-year warranty on all work"
      ],
      specifications: {
        "Service Type": "Residential Installation",
        "Duration": "1-2 Days",
        "Warranty": "1 Year",
        "Includes": "Materials & Labor"
      },
      terms: "Valid for new customers only. Cannot be combined with other offers."
    },
    2: {
      title: "Emergency Electrical Service",
      price: "$149",
      originalPrice: "$199",
      discount: "25% OFF",
      images: [
        "img/promo2-detail-1.jpg",
        "img/promo2-detail-2.jpg",
        "img/promo2-detail-3.jpg"
      ],
      description: "24/7 emergency electrical service for urgent electrical issues. Fast response time and professional diagnosis.",
      features: [
        "24/7 emergency response",
        "Professional electrical diagnosis",
        "Safety assessment included",
        "Immediate problem resolution",
        "Licensed and insured technicians"
      ],
      specifications: {
        "Service Type": "Emergency Service",
        "Response Time": "Within 2 Hours",
        "Availability": "24/7",
        "Coverage": "All Areas"
      },
      terms: "Emergency service rates apply. Additional charges for parts and extended labor."
    },
    3: {
      title: "Smart Home Setup Package",
      price: "$599",
      originalPrice: "$799",
      discount: "25% OFF",
      images: [
        "img/promo3-detail-1.jpg",
        "img/promo3-detail-2.jpg",
        "img/promo3-detail-3.jpg"
      ],
      description: "Transform your home into a smart home with our comprehensive setup package. Includes smart switches, outlets, and automation system.",
      features: [
        "Smart switch and outlet installation",
        "Home automation system setup",
        "Mobile app configuration",
        "Voice control integration",
        "Training and support included"
      ],
      specifications: {
        "Service Type": "Smart Home Installation",
        "Duration": "2-3 Days",
        "Devices": "Up to 15 Smart Devices",
        "Support": "6 Months Free Support"
      },
      terms: "Smart devices not included in base price. Additional charges may apply for premium devices."
    }
  };

  const promo = promoData[id];

  if (!promo) {
    return (
      <div className="container" style={{ padding: "100px 0" }}>
        <h2>Promo not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-custom">
          Go Back
        </button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === promo.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? promo.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="promo-detail-page">
      <div className="container" style={{ padding: "30px 0" }}>
        {/* Logo */}
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-md-12">
            <a href="/" style={{ display: "inline-block" }}>
              <img 
                src="/img/Banner_16x_TR_Trim&ColorEdit.png" 
                alt="CyberElectrix Logo" 
                style={{ height: '60px', width: 'auto' }}
              />
            </a>
          </div>
        </div>

        <div className="row">
          {/* Product Image Carousel */}
          <div className="col-md-6">
            <div className="product-image-carousel">
              <div className="carousel-container" style={{ position: "relative" }}>
                <div className="image-container" style={{ position: "relative" }}>
                  <img 
                    src={promo.images[currentImageIndex]} 
                    alt={promo.title}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      backgroundColor: "#f8f9fa",
                      border: "2px dashed #dee2e6"
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div 
                    style={{
                      display: "none",
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#f8f9fa",
                      border: "2px dashed #dee2e6",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6c757d",
                      fontSize: "18px"
                    }}
                  >
                    Product Image Placeholder {currentImageIndex + 1}
                  </div>
                  
                  {/* Left Arrow */}
                  <button 
                    onClick={prevImage}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ‹
                  </button>
                  
                  {/* Right Arrow */}
                  <button 
                    onClick={nextImage}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ›
                  </button>
                </div>
                
                {/* Dot Indicators */}
                <div style={{ 
                  textAlign: "center", 
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px"
                }}>
                  {promo.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: index === currentImageIndex ? "#f8825a" : "#dee2e6",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <div className="product-details">
              <h1 style={{ color: "#333", marginBottom: "20px" }}>{promo.title}</h1>
              
              <div className="price-section" style={{ marginBottom: "20px" }}>
                <span className="current-price" style={{ 
                  fontSize: "32px", 
                  fontWeight: "bold", 
                  color: "#f8825a" 
                }}>
                  {promo.price}
                </span>
                <span className="original-price" style={{ 
                  fontSize: "24px", 
                  textDecoration: "line-through", 
                  color: "#999", 
                  marginLeft: "15px" 
                }}>
                  {promo.originalPrice}
                </span>
                <span className="discount-badge" style={{
                  backgroundColor: "#fd0003",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginLeft: "15px"
                }}>
                  {promo.discount}
                </span>
              </div>

              <div className="product-description" style={{ marginBottom: "30px" }}>
                <h3 style={{ color: "#333", marginBottom: "15px" }}>Description</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>{promo.description}</p>
              </div>

              <div className="product-features" style={{ marginBottom: "30px" }}>
                <h3 style={{ color: "#333", marginBottom: "15px" }}>Features</h3>
                <ul style={{ paddingLeft: "20px" }}>
                  {promo.features.map((feature, index) => (
                    <li key={index} style={{ color: "#666", marginBottom: "8px" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-actions">
                <button 
                  onClick={() => window.location.href = "/#contact"}
                  className="btn btn-custom btn-lg" 
                  style={{ marginRight: "15px" }}
                >
                  Book Now
                </button>
                <button 
                  onClick={() => navigate(-1)} 
                  className="btn btn-outline-secondary btn-lg"
                  style={{ 
                    backgroundColor: "transparent", 
                    border: "2px solid #6c757d",
                    color: "#6c757d"
                  }}
                >
                  Back to Promos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="row" style={{ marginTop: "50px" }}>
          <div className="col-md-12">
            <h3 style={{ color: "#333", marginBottom: "20px" }}>Specifications</h3>
            <div className="specifications-table">
              <table className="table table-striped">
                <tbody>
                  {Object.entries(promo.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: "bold", color: "#333" }}>{key}</td>
                      <td style={{ color: "#666" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-md-12">
            <div className="terms-section" style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #dee2e6"
            }}>
              <h4 style={{ color: "#333", marginBottom: "15px" }}>Terms & Conditions</h4>
              <p style={{ color: "#666", margin: "0", fontSize: "14px" }}>
                {promo.terms}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with Copyright */}
      <div style={{
        backgroundColor: "#f6f6f6",
        padding: "20px 0",
        marginTop: "50px",
        textAlign: "center"
      }}>
        <div className="container">
          <p style={{ color: "#888", fontSize: "14px", margin: "0" }}>
            &copy; {new Date().getFullYear()} CyberElectrix Ltd. Designed and Administered by{" "}
            <a 
              href="https://yuccan.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#608dfd" }}
            >
              Yuccan Technologies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};