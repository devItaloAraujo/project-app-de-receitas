import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src="src/images/drinkIcon.svg"
          alt="drink icon"
          data-testid="drinks-bottom-btn"
          className="footer-icon"
        />
      </Link>
      <Link to="/meals">
        <img
          src="src/images/mealIcon.svg"
          alt="meal icon"
          data-testid="meals-bottom-btn"
          className="footer-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
