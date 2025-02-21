import React from 'react';
import HeaderIntro from '../components/layout/navbarlogado';
import Banner from '../components/layout/banner'
import Notices from '../components/hooks/notices'
import Footer from '../components/layout/footer'

const HomeScreen = () => {
  return (
    <div className="Home">
      <HeaderIntro />
      <Banner />
      <Notices />
      <Footer />
    </div>
  )
}

export default HomeScreen;