import MenuIntro from '../design/elements/menuIntro';
import MarcaNavbar from '../design/elements/marcaNavbar';

const HeaderIntro = () => {
  return (
    <header className="header-intro">
      <MarcaNavbar />
      <MenuIntro />
    </header>
  )
}

export default HeaderIntro;