import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const OCard = ({ number, title, date, id }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div
      className={`OCard__card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="OCard__header">
        <span className="OCard__number">[{number.toString().padStart(2, "0")}]</span>
        <h2 className="OCard__title">{title.toUpperCase()}</h2>
      </div>
      <div className="OCard__footer">
        <span className="OCard__date">{date}</span>
        {hovered && (
          <button className="OCard__open" onClick={handleOpen}>
            .VER
          </button>
        )}
      </div>
    </div>
  );
};

export default OCard;
