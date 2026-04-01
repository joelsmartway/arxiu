import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import "./styles.css";
import { ModalFormFactory } from "./Forms";

const Element  = ({ 
  callback = () => {} ,
  entity,
  id=null
}) => {
  const Form = ModalFormFactory.createForm(entity);
  const [currentId, setCurrentId] = useState(id);
  const close = () => {
    callback(false);
    setCurrentId(null);
  }
  return (
    <div className="Modal__container">
      <div className="Modal__content">
        <button
          className="Modal__closeBtn"
          onClick={close}
        >
          ✕
        </button>
        <Form
          id={currentId}
          callback={close}
        />
      </div>
    </div>
  );
};

export default Element;
