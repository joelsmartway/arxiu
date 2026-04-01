import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostService,CategoryService,AuthorService } from '../../services';
import CategoryList from '../../components/Home/CategoryList';
import AuthorCard from '../../components/AuthorCard';
import Layout from '../../components/Layout';
import "./styles.css";

const Page = () => {
  const { id } = useParams(); 

  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState([]);
  const [author, setAuthor] = useState([]);


  useEffect(() => {
    const fetch = async () => {
     try {
        const cat = await CategoryService.getAll(); 
        setCategories(cat);
        const postResult = await PostService.getById(id); 
        setPost(postResult);
        if(postResult.author_id){
          const author  = await AuthorService.getById(postResult.author_id)
          setAuthor(author)
        }
      } catch (error) {
        console.error("Failed on fetching:", error);
      }
    };

    fetch();
  }, []);

  return (
    <Layout>
      <div className='Page__grid'>
        <div>
          <CategoryList categories={categories}/>
        </div>
        <div className='Page__content'>
          <div className='Page__content__title'>{post.title}</div>
          <div className='Page__content__text'>{post.content}</div>
          <div className='Page__content__author'>
            {author && (
              <AuthorCard
                user={{
                  name:author.name,
                  cover:author.cover?.[0],
                  description:author?.description
                }}
              />
            )}
          </div>
        </div>
        <div className='Page__images'>
          {post?.images?.map((image)=>(
            <img src={image.url} alt="" />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
