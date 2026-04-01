import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../../../../services";
import Modal from '../../Modal';
import "../styles.css";

const Element = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // status is for updating or creating mode of modal
  const [dialog,setDialog] = useState(false);
  const [elementSelected,setElementSelected] = useState(false);

  const fields = [
    "id",
    "name",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await CategoryService.getAll();
        setCategories(category);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    const ids = categories.filter((p) => p._checked).map((p) => p.id);

    if (ids.length === 0) return alert("No categories selected.");

    if (!window.confirm("Delete selected categories?")) return;

    try {
      await Promise.all(
        ids.map((id) => CategoryService.delete(id))
      );
      setCategories(categories.filter((p) => !ids.includes(p.id)));
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
          + Create Category
        </button>

        <button className="Dashboard__btn delete" onClick={handleDelete}>
          Delete Categories
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
                  setCategories(categories.map((p) => ({ ...p, _checked: checked })));
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
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <input
                  type="checkbox"
                  checked={category._checked || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setCategories(
                      categories.map((p) =>
                        p.id === category.id ? { ...p, _checked: checked } : p
                      )
                    );
                  }}
                />
              </td>

              {fields.map((field) => (
                <td key={field}>{category[field]}</td>
              ))}

              <td>
                <button
                  className="Dashboard__btn update"
                  onClick={() => handleUpdate(category.id)}
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
          entity='category'
          id={elementSelected}
        />
      )}
    </div>
  );
};

export default Element;

