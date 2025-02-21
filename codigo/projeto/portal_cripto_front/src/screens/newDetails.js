import NewsDetail from '../components/hooks/details'
import NavbarIntro from '../components/layout/navbarIntro';
import Banner from '../components/layout/banner';
import Footer from '../components/layout/footer';

const NewsDetailScreen = () => {
  return (
    <div>
      <NavbarIntro />
      <Banner />
      <NewsDetail />
      <Footer />
    </div>
  )
}

export default NewsDetailScreen;