import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../../../services";
import Modal from '../../Modal';
import "../styles.css";

const Element = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  // status is for updating or creating mode of modal
  const [dialog,setDialog] = useState(false);
  const [elementSelected,setElementSelected] = useState(false);

  const fields = [
    "id",
    "name",
    "description",
    "created_at",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const author = await AuthorService.getAll();
        setAuthors(author);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    const ids = authors.filter((p) => p._checked).map((p) => p.id);

    if (ids.length === 0) return alert("No authors selected.");

    if (!window.confirm("Delete selected authors?")) return;

    try {
      await Promise.all(
        ids.map((id) => AuthorService.delete(id))
      );
      setAuthors(authors.filter((p) => !ids.includes(p.id)));
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
          + Create Author
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
                  setAuthors(authors.map((p) => ({ ...p, _checked: checked })));
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
          {authors.map((author) => (
            <tr key={author.id}>
              <td>
                <input
                  type="checkbox"
                  checked={author._checked || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAuthors(
                      authors.map((p) =>
                        p.id === author.id ? { ...p, _checked: checked } : p
                      )
                    );
                  }}
                />
              </td>

              {fields.map((field) => (
                <td key={field}>{author[field]}</td>
              ))}

              <td>
                <button
                  className="Dashboard__btn update"
                  onClick={() => handleUpdate(author.id)}
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
          entity='author'
          id={elementSelected}
        />
      )}
    </div>
  );
};

export default Element;

