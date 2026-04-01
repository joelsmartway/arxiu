import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostService } from "../../../../services";
import Modal from '../../Modal';
import "../styles.css";

const Element = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // status is for updating or creating mode of modal
  const [dialog,setDialog] = useState(false);
  const [elementSelected,setElementSelected] = useState(false);

  const fields = [
    "id",
    "title",
    "content",
    "created_at",
    "updated_at",
    "author_id",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await PostService.getAll();
        setPosts(post);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    const ids = posts.filter((p) => p._checked).map((p) => p.id);

    if (ids.length === 0) return alert("No posts selected.");

    if (!window.confirm("Delete selected posts?")) return;

    try {
      await Promise.all(
        ids.map((id) => PostService.delete(id))
      );
      setPosts(posts.filter((p) => !ids.includes(p.id)));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCreate = () => {
    setElementSelected(null);
    setDialog(true);
  };

  const handleUpdate = (id) => {
    setDialog(true);
    setElementSelected(id);
  };

  return (
    <div>
      <div className="Dashboard__actions">
        <button className="Dashboard__btn create" onClick={handleCreate}>
          + Create Post
        </button>

        <button className="Dashboard__btn delete" onClick={handleDelete}>
          Delete Selected
        </button>
      </div>

      <table
        className="Dashboard__content__table"
        style={{ "--columns": fields.length + 2 }} 
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setPosts(posts.map((p) => ({ ...p, _checked: checked })));
                }}
              />
            </th>

            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <input
                  type="checkbox"
                  checked={post._checked || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setPosts(
                      posts.map((p) =>
                        p.id === post.id ? { ...p, _checked: checked } : p
                      )
                    );
                  }}
                />
              </td>

              {fields.map((field) => (
                <td key={field}>{post[field]}</td>
              ))}

              <td>
                <button
                  className="Dashboard__btn update"
                  onClick={() => handleUpdate(post.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dialog && (
        <Modal
          callback={setDialog}
          entity='post'
          id={elementSelected}
        />
      )}
    </div>
  );
};

export default Element;

