import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://servicodados.ibge.gov.br/api/v3/noticias`);
        const data = await response.json();
        const article = data.items.find((item) => item.id === parseInt(id));
        setNewsDetail(article);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (!newsDetail) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h1>{newsDetail.titulo}</h1>
      {newsDetail.imagens && <img src = {JSON.parse(newsDetail.imagens).image_fulltext} alt={newsDetail.titulo} className='news-details-image' />}
      <p> {newsDetail.introducao || 'Conteúdo não disponível'}</p>
      <a href={newsDetail.link} target="_blank" rel="noopener noreferrer">Leia mais na fonte original</a>
    </div>
  );
};


export default NewsDetail;