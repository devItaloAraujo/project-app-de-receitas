import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

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
      <h1 data-testid="page-title">{ title }</h1>
      { perfil
        && (
          <button onClick={ () => navigate('/profile') }>
            <img
              src="src/images/profileIcon.svg"
              alt="logo profile"
              data-testid="profile-top-btn"
            />
          </button>) }
      { pesquisa
        && (
          <button onClick={ () => setSearch(!search) }>
            <img
              src="src/images/searchIcon.svg"
              alt="logo search"
              data-testid="search-top-btn"
            />
          </button>) }
      { search
        && <SearchBar /> }
    </header>
  );
}

export default Header;
