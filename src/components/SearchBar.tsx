import { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import './SearchBar.css';

function SearchBar() {
  const { searchEndPoint } = useContext(RecipesContext);

  const [radio, setRadio] = useState('');
  const [value, setValue] = useState('');

  const handleClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (radio === 'first-letter' && value.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    searchEndPoint(radio, value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setValue(target.value) }
        className="input-search"
        placeholder="Search"
      />
      <div className="radio-button">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          className="radio"
          name="search"
          onChange={ ({ target }) => setRadio(target.id) }
        />
        <label htmlFor="ingredient" className="radio">Ingrediente</label>
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          className="radio"
          name="search"
          onChange={ ({ target }) => setRadio(target.id) }
        />
        <label htmlFor="name" className="radio">Nome</label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          className="radio"
          name="search"
          onChange={ ({ target }) => setRadio(target.id) }
        />
        <label htmlFor="first-letter" className="radio">Primeira Letra</label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ (event) => handleClickSearch(event) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
