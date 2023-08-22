import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';

function Recipes() {
  const location = useLocation();

  return (
    <>
      { location.pathname === '/meals'
        ? <Header title="Meals" perfil pesquisa />
        : <Header title="Drinks" perfil pesquisa /> }
      { location.pathname === '/meals'
        && <Meals /> }
      { location.pathname === '/drinks'
        && <Drinks /> }
      <Footer />
    </>
  );
}

export default Recipes;
