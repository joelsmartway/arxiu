import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import PostTable from '../../components/Dashboard/Content/PostsTable';
import CategoryTable from '../../components/Dashboard/Content/CategoryTable';
import AuthorTable from '../../components/Dashboard/Content/AuthorTable';
import "./styles.css";

const Dashboard = () => {
  const [activeEntity, setActiveEntity] = useState("posts");

  const entities = [
    { title: "posts" },
    { title: "categories" },
    { title: "authors" },
  ];

  const tables = {
    posts: <PostTable />,
    categories: <CategoryTable />,
    authors: <AuthorTable />,
  };

  return (
    <div className="Dashboard__container">
      <div className="Dashboard__entities">
        {entities.map((entity) => (
          <div
            key={entity.title}
            className={`Dashboard__entities__element ${
              activeEntity === entity.title ? "active" : ""
            }`}
            onClick={() => setActiveEntity(entity.title)}
          >
            {entity.title}
          </div>
        ))}
      </div>

      <div className="Dashboard__content">
        {tables[activeEntity]}
      </div>
    </div>
  );
};

export default Dashboard;
