import React, { useState } from "react";
import { Modal } from "./Modal";

export const Image = ({ title, description, largeImage, smallImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="portfolio-item">
        <div className="hover-bg">
          <a href="#" onClick={handleImageClick} title={title}>
            <div className="hover-text">
              <h4>{title}</h4>
              {description && <p style={{fontSize: '14px', margin: '10px 0', opacity: '0.9'}}>{description}</p>}
            </div>
            <img src={smallImage} className="img-responsive" alt={title} />
          </a>
        </div>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        description={description}
        image={largeImage}
      />
    </>
  );
};
