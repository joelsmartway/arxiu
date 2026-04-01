import { useEffect, useState } from 'react';
import { PostService,CategoryService } from '../../services';
import Layout from '../../components/Layout';
import OCard from '../../components/OCard';
import CategoryList from '../../components/Home/CategoryList';
import { useSearchParams } from "react-router-dom";
import "./styles.css";
 
const Home = () => {
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");

  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cat = await CategoryService.getAll(); 
        setCategories(cat);
        const post = await PostService.getAll({params:{category_id}}); 
        setPosts(post);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, [category_id]); 

  return (
    <Layout>
      <div className='Home__layout'>
        <CategoryList categories={categories}/>
        <div>
          {posts.map((post,i)=>(
            <OCard
              id={post.id}
              title={post.title}
              date={post.created_at}
              number={i}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
