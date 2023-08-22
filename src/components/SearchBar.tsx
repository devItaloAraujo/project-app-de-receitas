import { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

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
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient"
        name="search"
        onChange={ ({ target }) => setRadio(target.id) }
      />
      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio"
        data-testid="name-search-radio"
        id="name"
        name="search"
        onChange={ ({ target }) => setRadio(target.id) }
      />
      <label htmlFor="name">Nome</label>
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="first-letter"
        name="search"
        onChange={ ({ target }) => setRadio(target.id) }
      />
      <label htmlFor="first-letter">Primeira Letra</label>
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
