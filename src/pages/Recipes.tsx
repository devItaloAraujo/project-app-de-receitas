import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Recipes() {
  const location = useLocation();

  return (
    <>
      { location.pathname === "/meals"
        ? <Header title="Meals" perfil={ true } pesquisa={ true } />
        : <Header title="Drinks" perfil={ true } pesquisa={ true } /> }
      <h1>Receitas</h1>
    </>
  );
}

export default Recipes;
