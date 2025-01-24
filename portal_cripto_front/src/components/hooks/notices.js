import React, { useState, useEffect } from 'react';
import NewsItem from '../container/newsItem';

const Notices = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:3001/api/noticias.json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setNews((prevNews) =>
          (page === 1) ? data.noticias : [...prevNews, ...data.noticias]
        );
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  return (
    <div>
      <h1>Principais Notícias</h1>
      <div className="news-list">
        {news.map((item, index) => (
          <NewsItem 
            key={`${item.id}-${index}`}
            id={item.id}
            title={item.titulo}
            summary={item.lide || 'Sem descrição disponível'}
            image={item.imagem ? item.imagem : null}
          />
        ))}
      </div>
      { (
        <button className='button-more' onClick={() => setPage((prevPage) => prevPage + 1)} disabled={loading}>
          {loading ? 'Carregando...' : 'Carregar mais'}
        </button>
      )}
    </div>
  );
};

export default Notices;
