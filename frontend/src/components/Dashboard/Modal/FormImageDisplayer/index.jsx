import { useState } from 'react';
import "./styles.css";

const FormImageDisplayer = ({ images = [], onChange }) => {

  const removeImage = (indexToRemove) => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="FormImageDisplayer">
      {images.map((image, index) => (
        <div key={image.id} className="image-container">
          <img src={image.url || image} alt="" />

          <button
            type="button"
            className="remove-btn"
            onClick={() => removeImage(index)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormImageDisplayer;
