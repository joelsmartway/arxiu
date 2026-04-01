import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import FormImageDisplayer from "../../FormImageDisplayer";
import { AuthorService } from "../../../../../services";
import "./styles.css";


export const AuthorForm = ({
  id=null,
  callback
}) => {
  const [author, setAuthor] = useState({});
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState([]);
  const clearData = () => {
      setName('');
      setDescription("");
      setCover([]);
  }


  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      cover.forEach(img => formData.append("cover", img));


      if(id){
        const response = await AuthorService.update(id,formData);
      }else {
        const response = await AuthorService.create(formData);
      }


      clearData();
    } catch (err) {
      console.error("Author creation failed:", err);
    }finally {
      setLoading(false);
      callback();
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAuthor = await AuthorService.getById(id);
          setAuthor(fetchedAuthor);
          setName(fetchedAuthor.name || "");
          setDescription(fetchedAuthor.description || "");
          setCover(
            fetchedAuthor.cover
              ? Array.isArray(fetchedAuthor.cover)
                ? fetchedAuthor.cover
                : [fetchedAuthor.cover]
              : []
          );
        }else{
          // cleaer data when changue to updata and create
          clearData();
        }
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
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="field">
            <textarea
              type="text"
              id="description"
              className='content'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            { !description && <label htmlFor="content">Description</label> }
          </div>
          <div className="field">
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={(e) => setCover(Array.from(e.target.files))}
            />
            <label htmlFor="currentImages">Cover</label>
          </div>
          <FormImageDisplayer
            images={cover}
            onChange={setCover}
          />


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
