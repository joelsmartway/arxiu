import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { CategoryService } from "../../../../../services";
import FormImageDisplayer from "../../FormImageDisplayer";
import SelectCategory from "../../SelectCategory";
import "./styles.css";


export const CategoryForm = ({
  id=null,
  callback
}) => {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const clearData = () => {
      setName("");
  }


  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);

      if(id){
        const response = await CategoryService.update(id,formData);
      }else {
        const response = await CategoryService.create(formData);
      }


      clearData();
    } catch (err) {
      console.error("Post creation failed:", err);
    }finally {
      setLoading(false);
      callback();
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await CategoryService.getById(id);
          setCategory(response);
          setName(response.name || "");
        }else{
          clearData();
        }
        const categories = await CategoryService.getAll()
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="ModalForm__container">
      <div className="ModalForm__content">
        <form className="ModalForm__content__form" onSubmit={handleCreate}>
          
          <div className="field">
            <input
              type="text"
              id="title"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          
          <button type="submit" className="login-btn">
            {loading ? (
              'Enviando...'
            ) : (
              (!id ? "Enviar" : "Actualizar")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
