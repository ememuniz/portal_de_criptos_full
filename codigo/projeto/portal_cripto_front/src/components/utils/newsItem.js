import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import photo from '../../assets/images/photos/p4.png'
import { useParams } from 'react-router-dom';

const NewsItem = ({ id, title, summary, image }) => {
  
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/noticias.json`);
        const data = await response.json();
        const article = data.noticias.find((item) => item.id === parseInt(id));
        setNewsDetail(article);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    }
    fetchNewsDetail();
  }, [id]);

  if (!newsDetail) return <p>Loading...</p>;

  return (
    <div className="news-item">
      {image && <img src={image} alt={title} className="news-image" />}
      <h3>{title}</h3>
      <p>{summary}</p>
      <Link to={`/news/${id}`}>
        <button className='button-read-more'>Ler mais</button>
      </Link>
    </div>
  );
};

export default NewsItem;
