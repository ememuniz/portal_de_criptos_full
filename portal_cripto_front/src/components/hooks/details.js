import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/noticias.json`);
        const data = await response.json();
        const article = data.noticias.find((item) => item.id === parseInt(id));
        console.log(article); 
        setNewsDetail(article);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    }
    fetchNewsDetail();
  }, [id]);

  if (!newsDetail) return <p>Loading...</p>;

  return (
    <div className='news-detail'>
      <h1>{newsDetail.titulo}</h1>
      <p className='news-details-date'><strong>Publicado em:</strong> {newsDetail.data_de_publicacao}</p>
      <img src = {newsDetail.imagem} alt={newsDetail.titulo} className='news-details-image' />
      <p className='news-details-summary'> {newsDetail.corpo_de_texto || 'Conteúdo não disponível'}</p>
    </div>
  )
}

export default Details
