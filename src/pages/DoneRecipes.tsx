import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { RecipeType } from '../types';
import Footer from '../components/Footer';

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
    });
  };

  return (
    <div>
      <Header title="DONE RECIPES" perfil pesquisa={ false } />
      { (linkCopied) && <p>Link copied!</p>}
      <button
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ () => setDisplayRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        name="meals"
        onClick={ () => setDisplayRecipes('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        name="drinks"
        onClick={ () => setDisplayRecipes('drink') }
      >
        Drinks
      </button>
      { (doneRecipes)
        && (doneRecipes.map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ `${index}-recipe-card` }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    style={ { width: '100px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="Recipe meals"
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Done in: ${recipe.doneDate}`}
                </p>
                <button
                  name={ recipe.type }
                  id={ recipe.id }
                  onClick={ handleCopy }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src="src/images/shareIcon.svg"
                    alt="share button"
                  />
                </button>
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
            );
          } if (recipe.type === 'drink') {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ `${index}-recipe-card` }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    style={ { width: '100px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="Recipe drinks"
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.alcoholicOrNot}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Done in: ${recipe.doneDate}`}
                </p>
                <button
                  name={ recipe.type }
                  id={ recipe.id }
                  onClick={ handleCopy }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src="src/images/shareIcon.svg"
                    alt="share button"
                  />
                </button>
              </div>
            );
          } return null;
        }))}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
