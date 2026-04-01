import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { PostService,AuthorService,CategoryService } from "../../../../../services";
import FormImageDisplayer from "../../FormImageDisplayer";
import SelectCategory from "../../SelectCategory";
import "./styles.css";


export const PostForm = ({
  id=null,
  callback
}) => {
  const [post, setPost] = useState({});
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [currentImages, setCurrentImages] = useState([]);
  const [newtImages, setNewImages] = useState([]);
  const clearData = () => {
      setPost({});
      setTitle("");
      setContent("");
      setCurrentImages([]);
      setAuthorId("");
      setSelectedCategories([]);
  }


  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author_id", authorId);
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("currentImages", JSON.stringify(currentImages));

      newtImages.forEach(img => formData.append("newImages", img));

      if(id){
        const response = await PostService.update(id,formData);
      }else {
        const response = await PostService.create(formData);
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
          const fetchedPost = await PostService.getById(id);
          setPost(fetchedPost);
          setTitle(fetchedPost.title || "");
          setContent(fetchedPost.content || "");
          setCurrentImages(fetchedPost.images || []);
          setAuthorId(fetchedPost.author_id || "");
          setSelectedCategories(
            (fetchedPost.categories || []).map(id => Number(id))
          );
        }else{
          // cleaer data when changue to updata and create
          clearData();
        }
        const categories = await CategoryService.getAll()
        setCategories(categories);
        const authors = await AuthorService.getAll();
        setAuthors(authors);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="username">Title</label>
          </div>

          <div className="field">
            <textarea
              type="text"
              id="content"
              className='content'
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            { !content && <label htmlFor="content">Content</label> }
          </div>

          <div className="field">
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setNewImages(Array.from(e.target.files))}
            />
            <label htmlFor="currentImages">Images</label>
          </div>
          <FormImageDisplayer
            images={currentImages}
            onChange={setCurrentImages}
          />

          <SelectCategory
            categories={categories}
            selectedCategories={selectedCategories}
            callback={setSelectedCategories}
          />
          

          <div className="field">
            <select
              id="author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              required
            >
              <option value="" disabled>Select an author</option>

              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

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
