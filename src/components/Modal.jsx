import React from "react";

export const Modal = ({ isOpen, onClose, title, description, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{textAlign: 'center', flex: 1}}>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img src={image} alt={title} className="modal-image" />
          <p className="modal-description">{description}</p>
        </div>
      </div>
    </div>
  );
};