import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FavoriteRecipe, RecipeType } from '../types';

function FavoriteRecipes() {
  const [displayRecipes, setDisplayRecipes] = useState('all');
  const [linkCopied, setLinkCopied] = useState(false);
  const storageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') ?? '[]');
  const [favoriteRecipes, setFavoriteRecipes] = useState(storageFavorites);
  const [favoriteRecipesDisplay,
    setFavoriteRecipesDisplay] = useState<FavoriteRecipe[]>(favoriteRecipes);

  useEffect(() => {
    if (displayRecipes === 'all') {
      setFavoriteRecipesDisplay(favoriteRecipes);
    } else {
      setFavoriteRecipesDisplay(favoriteRecipes
        .filter((recipe: RecipeType) => recipe.type === displayRecipes));
    }
  }, [displayRecipes, favoriteRecipes]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    navigator.clipboard.writeText(`http://localhost:3000/${target.name}s/${target.id}`).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleDesfavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    const { id } = target;
    setFavoriteRecipes((prev: FavoriteRecipe[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Header title="Favorite Recipes" perfil pesquisa={ false } />
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
      { (favoriteRecipesDisplay)
        && (favoriteRecipesDisplay.map((recipe, index) => {
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
                <button
                  name="like"
                  id={ recipe.id }
                  onClick={ handleDesfavorite }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src="src/images/blackHeartIcon.svg"
                    alt="like button"
                  />
                </button>
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
                <button
                  name="like"
                  id={ recipe.id }
                  onClick={ handleDesfavorite }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src="src/images/blackHeartIcon.svg"
                    alt="like button"
                  />
                </button>
              </div>
            );
          } return null;
        }))}
    </div>
  );
}

export default FavoriteRecipes;
