import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src="src/images/icone-bebida.png"
          alt="drink icon"
          data-testid="drinks-bottom-btn"
          className="footer-icon-drink"
        />
      </Link>
      <Link to="/meals">
        <img
          src="src/images/icone-prato.png"
          alt="meal icon"
          data-testid="meals-bottom-btn"
          className="footer-icon-meal"
        />
      </Link>
    </footer>
  );
}

export default Footer;
