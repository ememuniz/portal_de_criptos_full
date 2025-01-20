import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ id, title, summary, image }) => {
  return (
    <div className="news-item">
      {image && <img src={image} alt={title} className="news-image" />}
      <h3>{title}</h3>
      <p>{summary}</p>
      <Link to={`/news/${id}`}>Read more</Link>
    </div>
  );
};

export default NewsItem;
