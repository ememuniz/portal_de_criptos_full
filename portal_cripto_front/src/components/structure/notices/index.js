import React, { useState, useEffect } from 'react';
import NewsItem from '../../container/newsItem';

const Notices = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        console.log(searchTerm);
        console.log(encodeURIComponent(searchTerm))
        const url = searchTerm
          ? `http://servicodados.ibge.gov.br/api/v3/noticias?search=${encodeURIComponent(searchTerm)}`
          : `http://servicodados.ibge.gov.br/api/v3/noticias?page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        setNews((prevNews) =>
          (page === 1 || searchTerm) ? data.items : [...prevNews, ...data.items],
        );
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page, searchTerm]);

  return (
    <div>
      <h1>Principais Notícias</h1>
      <div className="news-list">
        {news.map((item) => (
          <NewsItem 
            key={item.id}
            id={item.id}
            title={item.titulo}
            summary={item.introducao || 'Sem descrição disponível'}
            image={item.imagem ? JSON.parse(item.imagem).image_intro : null}
          />
        ))}
      </div>
      {!searchTerm && (
        <button onClick={() => setPage((prevPage) => prevPage + 1)} disabled={loading}>
          {loading ? 'Carregando...' : 'Carregar mais'}
        </button>
      )}
    </div>
  );
};

export default Notices;
