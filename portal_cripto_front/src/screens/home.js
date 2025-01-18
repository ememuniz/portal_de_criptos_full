import React from 'react';
import Header from '../components/structure/header';
import Title from '../components/structure/title';
import './home.css';

const HomeScreen = () => {
  return (
    <div className="Home">
      <Header />
      <Title />
      <h1>Home</h1>
    </div>
  )
}

export default HomeScreen;

