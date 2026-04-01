import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import "./styles.css";
 
const Biography = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <Layout>
      <div className='Biography__layout'>
        EN DESSAROLLO &lt;3
      </div>
    </Layout>
  );
};

export default Biography;
