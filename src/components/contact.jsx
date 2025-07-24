import { useState } from "react";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
  honeypot: "", // Hidden field for bot detection
};

export const Contact = (props) => {
  const [{ name, email, message, honeypot }, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // "success" or "error"
  const [formStartTime] = useState(Date.now()); // Track when form was loaded

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    
    // Clear any previous messages when user starts typing
    if (submitMessage) {
      setSubmitMessage("");
      setSubmitStatus("");
    }
  };
  
  const clearState = () => setState({ ...initialState });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    try {
      // Prepare form data
      const formData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        formStartTime, // For timing validation
        honeypot // Should be empty for legitimate users
      };

      // Make API call to our backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message);
        clearState();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(result.message || "Failed to send message. Please try again.");
      }

    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contact Us</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                {/* Honeypot field - hidden from users, bots will fill it */}
                <input 
                  type="text" 
                  name="honeypot" 
                  value={honeypot}
                  onChange={handleChange}
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        required
                        disabled={isSubmitting}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        required
                        disabled={isSubmitting}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message (minimum 10 characters)"
                    value={message}
                    required
                    disabled={isSubmitting}
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                
                {/* Success/Error Messages */}
                {submitMessage && (
                  <div className={`alert ${submitStatus === 'success' ? 'alert-success' : 'alert-danger'}`} style={{marginBottom: '20px'}}>
                    {submitMessage}
                  </div>
                )}
                
                {/* Privacy Notice */}
                <div className="privacy-notice" style={{margin: '15px 0', fontSize: '14px', color: '#666'}}>
                  <p>
                    By submitting this form, you agree to our{" "}
                    <a href="/terms/terms-of-use.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a'}}>
                      Terms of Use
                    </a>
                    {" "}and{" "}
                    <a href="/terms/privacy-policy.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a'}}>
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-custom btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span style={{ fontWeight: 'bold' }}>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span style={{ fontWeight: 'bold' }}>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"} title="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.x : "/"} title="Follow us on X (formerly Twitter)" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"} title="Subscribe to our YouTube channel" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : "/"} title="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.tiktok : "/"} title="Follow us on TikTok" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-play-circle"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.whatsapp : "/"} title="Contact us on WhatsApp" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <div className="footer-links" style={{marginBottom: '15px'}}>
            <a href="/terms/terms-of-use.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a', textDecoration: 'none', margin: '0 10px'}}>
              Terms of Use
            </a>
            <span style={{color: '#666'}}>|</span>
            <a href="/terms/privacy-policy.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a', textDecoration: 'none', margin: '0 10px'}}>
              Privacy Policy
            </a>
            <span style={{color: '#666'}}>|</span>
            <a href="/terms/disclaimer.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a', textDecoration: 'none', margin: '0 10px'}}>
              Disclaimer
            </a>
            <span style={{color: '#666'}}>|</span>
            <a href="/terms/maintenance-terms.html" target="_blank" rel="noopener noreferrer" style={{color: '#f8825a', textDecoration: 'none', margin: '0 10px'}}>
              Maintenance Terms
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} CyberElectrix Ltd. Designed and Administered by{" "}
            <a href="https://yuccan.tech" target="_blank" rel="noopener noreferrer">
              Yuccan Technologies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
