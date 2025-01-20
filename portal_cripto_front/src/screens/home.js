import React from 'react';
import HeaderIntro from '../components/layout/navbarIntro';
import Banner from '../components/layout/banner'
import Notices from '../components/structure/notices';

const HomeScreen = () => {
  return (
    <div className="Home">
      <HeaderIntro />
      <Banner />
      <Notices />
      <h1>Home</h1>
    </div>
  )
}

export default HomeScreen;

