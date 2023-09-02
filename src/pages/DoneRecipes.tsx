import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { RecipeType } from '../types';
import Footer from '../components/Footer';
import './FavoriteAndDoneRecipes.css';

function DoneRecipes() {
  const [displayRecipes, setDisplayRecipes] = useState('all');
  const [linkCopied, setLinkCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([] as RecipeType[]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    if (items) {
      if (displayRecipes === 'all') {
        setDoneRecipes(items);
      } else {
        setDoneRecipes(items
          .filter((recipe: RecipeType) => recipe.type === displayRecipes));
      }
    }
  }, [displayRecipes]);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    navigator.clipboard.writeText(`http://localhost:3000/${target.name}s/${target.id}`).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div>
      <Header title="DONE RECIPES" perfil pesquisa={ false } />
      { (linkCopied) && <p>Link copied!</p>}
      <div className="filters-container">
        <label htmlFor="all" className="filter-label">
          <button
            data-testid="filter-by-all-btn"
            name="all"
            id="all"
            onClick={ () => setDisplayRecipes('all') }
            className="btn-filter"
          >
            <img src="src/images/icone-all.png" alt="all-icon" />
          </button>
          <span>All</span>
        </label>
        <label htmlFor="meals" className="filter-label">
          <button
            data-testid="filter-by-meal-btn"
            name="meals"
            id="meals"
            onClick={ () => setDisplayRecipes('meal') }
            className="btn-filter"
          >
            <img src="src/images/icone-prato.png" alt="all-icon" />
          </button>
          <span>Meals</span>
        </label>
        <label htmlFor="drinks" className="filter-label">
          <button
            data-testid="filter-by-drink-btn"
            name="drinks"
            onClick={ () => setDisplayRecipes('drink') }
            className="btn-filter"
          >
            <img src="src/images/icone-bebida.png" alt="all-icon" />
          </button>
          <span>Drinks</span>
        </label>
      </div>
      <div className="recipes-container">
        { (doneRecipes)
        && (doneRecipes.map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ `${index}-recipe-card` }
                className="individual-recipe-container"
              >
                <Link
                  to={ `/${recipe.type}s/${recipe.id}` }
                  className="left-side-recipe-card"
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="Recipe meals"
                  />
                </Link>
                <div className="right-side-recipe-card">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <h6 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h6>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <button
                    name={ recipe.type }
                    id={ recipe.id }
                    onClick={ handleCopy }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src="src/images/share.svg"
                      alt="share button"
                    />
                  </button>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {`Done in: ${recipe.doneDate.substring(0, 10)}`}
                  </p>
                  <div>
                    {recipe.tags
                      .map((tag) => (
                        <span
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          key={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </span>))}
                  </div>
                </div>
              </div>
            );
          } if (recipe.type === 'drink') {
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ `${index}-recipe-card` }
                className="individual-recipe-container"
              >
                <Link
                  to={ `/${recipe.type}s/${recipe.id}` }
                  className="left-side-recipe-card"
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="Recipe drinks"
                  />
                </Link>
                <div className="right-side-recipe-card">
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <h6 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h6>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.alcoholicOrNot}`}
                  </p>
                  <button
                    name={ recipe.type }
                    id={ recipe.id }
                    onClick={ handleCopy }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src="src/images/share.svg"
                      alt="share button"
                    />
                  </button>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {`Done in: ${recipe.doneDate.substring(0, 10)}`}
                  </p>
                </div>
              </div>
            );
          } return null;
        }))}
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
