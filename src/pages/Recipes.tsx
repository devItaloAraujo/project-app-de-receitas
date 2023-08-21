import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Recipes() {
  const location = useLocation();

  return (
    <>
      { location.pathname === '/meals'
        ? <Header title="Meals" perfil pesquisa />
        : <Header title="Drinks" perfil pesquisa /> }
      <h1>Receitas</h1>
    </>
  );
}

export default Recipes;
