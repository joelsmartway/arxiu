import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CategoryList = ({categories}) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/?category_id=${id}`);
  };
  return (
    <div className="CategoryList__container">
      <ul className="CategoryList__menu">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              data-text={category.name}
              onClick={() => handleClick(category.id)}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoryList;
