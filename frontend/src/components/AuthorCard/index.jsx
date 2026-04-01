import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AuthorCard = ({user}) => {
  return (
    <div className="AuthorCard__container">
      <img
        src={user?.cover}
      />
      <div>
        <div className="AuthorCard__container__name">
          {user?.name}
        </div>
        <div className="AuthorCard__container__description">
          {user?.description}
        </div>
      </div>
    </div>
  )
}

export default AuthorCard;


