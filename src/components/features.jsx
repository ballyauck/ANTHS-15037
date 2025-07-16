import React, { useState } from "react";
import { Modal } from "./Modal";

export const Features = (props) => {
  const [modalData, setModalData] = useState(null);

  const handleFeatureClick = (feature) => {
    setModalData(feature);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Solutions</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  <div className="feature-item" onClick={() => handleFeatureClick(d)}>
                    <i className={d.icon}></i>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
      
      {modalData && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={modalData.title}
          description={modalData.description}
          image={modalData.image}
        />
      )}
    </div>
  );
};
