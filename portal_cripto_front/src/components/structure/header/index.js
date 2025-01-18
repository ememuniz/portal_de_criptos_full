import './style.css';
import VisualBranding from '../../design/visualBranding';
import NavBar from '../../design/navBar';

const Header = () => {
  return (
    <header className="header">
      <VisualBranding />
      <NavBar />
    </header>
  );
}

export default Header