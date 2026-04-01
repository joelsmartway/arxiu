import { useState } from 'react';
import "./styles.css";

const SelectCategory = ({ 
  categories = [], 
  selectedCategories = [],
  callback 
}) => {
  const [open, setOpen] = useState(false);

  const toggleCategory = (id) => {
    callback(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="field multi-select">
      <div
        className="select-box"
        onClick={() => setOpen(prev => !prev)}
      >
        {selectedCategories.length === 0 && (
          <span className="placeholder">Select categories...</span>
        )}

        {selectedCategories.map(id => {
          const cat = categories.find(c => c.id === id);
          return (
            <span key={id} className="chip">
              {cat?.name}
              <button
                type="button"
                className="remove-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  callback(selectedCategories.filter(x => x !== id));
                }}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {open && (
        <div className="dropdown">
          {categories.map(category => (
            <div
              key={category.id}
              className={`dropdown-item ${
                selectedCategories.includes(category.id) ? "selected" : ""
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
