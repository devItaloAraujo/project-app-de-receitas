import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';

type HeaderProps = {
  title: string,
  perfil: boolean,
  pesquisa: boolean,
};

function Header(props: HeaderProps) {
  const { title, perfil, pesquisa } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);

  return (
    <header>
      <div className="header-container">
        <img src="src/images/logo-Recipes-App.png" alt="icon App de Receitas" />
        <h2>RECIPES app</h2>
        <div>
          { perfil
            && (
              <button onClick={ () => navigate('/profile') } className="button-header">
                <img
                  src="src/images/profileIcon.png"
                  alt="logo profile"
                  data-testid="profile-top-btn"
                  className="icon-header"
                />
              </button>) }
          { pesquisa
            && (
              <button onClick={ () => setSearch(!search) } className="button-header">
                <img
                  src="src/images/searchIcon.png"
                  alt="logo search"
                  data-testid="search-top-btn"
                  className="icon-header"
                />
              </button>) }
        </div>
      </div>
      <h1 data-testid="page-title">{ title }</h1>
      { title === 'Meals'
        ? <img src="src/images/icone-prato.png" alt="icon meals" id="icon" />
        : <img src="src/images/icone-bebida.png" alt="icon drinks" id="icon" /> }
      { search
        && <SearchBar /> }
    </header>
  );
}

export default Header;
