import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { Details, DoneRecipe, FavoriteRecipe, Ingredient } from '../types';
import './RecipeInProgress.css';

let apiUrl: string;

function RecipeInProgress() {
  const { id, type } = useParams();
  const [details, setDetails] = useState<Details>();
  const [isShareIconClicked, setIsShareIconClicked] = useState(false);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);

  if (type === 'meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  useEffect(() => {
    const inProgressRecipe = (
      JSON.parse(localStorage.getItem('inProgressRecipes') || '[]') as Array<Details>)
      .filter(
        (currentInProgressRecipe) => currentInProgressRecipe.id === id,
      )[0];

    if (inProgressRecipe) {
      setDetails(inProgressRecipe);
    } else {
      fetch(apiUrl).then((response) => response.json())
        .then(({ meals, drinks }) => {
          const mealsDrinks = (meals || drinks)[0];
          setDetails({
            id: id || '',
            photo: mealsDrinks.strMealThumb || mealsDrinks.strDrinkThumb,
            title: mealsDrinks.strMeal || mealsDrinks.strDrink,
            category: mealsDrinks.strCategory,
            instructions: mealsDrinks.strInstructions,
            nationality: (mealsDrinks.strArea || ''),
            alcoholicOrNot: (mealsDrinks.strAlcoholic || ''),
            tags: mealsDrinks.strTags ? mealsDrinks.strTags.split(',') : [],
            ingredients: Object.entries(mealsDrinks)
              .filter((entrie) => entrie[0].includes('strIngredient'))
              .filter((entrie) => entrie[1] !== '' && entrie[1] !== null)
              .map((entrie) => (
                { label: entrie[1], checked: false }
              )) as Array<Ingredient>,
          });
        });
    }
  }, [id]);

  useEffect(() => {
    if (details) {
      const inProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes') || '[]',
      ) as Array<Details>;

      localStorage.setItem('inProgressRecipes', JSON.stringify(
        [
          ...inProgressRecipes.filter((inProgressRecipe) => inProgressRecipe.id !== id),
          details,
        ],
      ));
      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      ) as Array<FavoriteRecipe>;
      favoriteRecipes.forEach((favoriteRecipe) => {
        if (favoriteRecipe.id === id) {
          setIsFavoriteRecipe(true);
        }
      });
    }
  }, [id, details]);

  const copyLink = () => {
    const appUrl = window.location.href.replace('/in-progress', '');

    navigator.clipboard.writeText(appUrl).then(
      () => setIsShareIconClicked(true),
    );
  };

  const favoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    ) as Array<FavoriteRecipe>;

    if (isFavoriteRecipe) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          favoriteRecipes.filter((
            currentFavoriteRecipe,
          ) => currentFavoriteRecipe.id !== id),
        ),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, {
          id,
          type: type?.substring(0, type.length - 1),
          nationality: details?.nationality,
          category: details?.category,
          alcoholicOrNot: details?.alcoholicOrNot,
          name: details?.title,
          image: details?.photo,
        }]),
      );
    }

    setIsFavoriteRecipe(!isFavoriteRecipe);
  };

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') || '[]',
    ) as Array<DoneRecipe>;

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipes, {
        id,
        type: type?.substring(0, type.length - 1),
        nationality: details?.nationality,
        category: details?.category,
        alcoholicOrNot: details?.alcoholicOrNot,
        name: details?.title,
        image: details?.photo,
        tags: details?.tags,
        doneDate: new Date().toISOString(),
      }]),
    );
  };

  return (
    <>
      <button data-testid="share-btn" onClick={ copyLink }>
        <img
          src={ shareIcon }
          alt="Botão de compartilhar"
          className="button-favorite-img"
        />
      </button>
      {isShareIconClicked && <span>Link copied!</span>}
      <button onClick={ favoriteRecipe }>
        {
          isFavoriteRecipe
            ? <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="Botão de favoritar selecionado"
                className="button-favorite-img"
            />
            : <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Botão de favoritar desselecionado"
                className="button-favorite-img"
            />
        }
      </button>
      <img
        src={ details?.photo }
        alt={ details?.title }
        data-testid="recipe-photo"
        className="w-100"
      />
      <h2 data-testid="recipe-title" className="recipe-title">{details?.title}</h2>
      <p data-testid="recipe-category" className="span">{details?.category}</p>
      <p data-testid="instructions" className="span">{details?.instructions}</p>
      <h3>Ingredients</h3>
      <ul>
        {
          details?.ingredients.map((ingredient, index) => (
            <li key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                style={ ingredient.checked
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' } : {} }
              >
                <input
                  type="checkbox"
                  checked={ ingredient.checked }
                  onChange={ ({ target }) => {
                    details.ingredients[index].checked = target.checked;
                    setDetails({ ...details });
                  } }
                />
                <span>&nbsp;</span>
                <span>{ingredient.label}</span>
              </label>
            </li>
          ))
        }
      </ul>
      <button
        data-testid="finish-recipe-btn"
        onClick={ finishRecipe }
        disabled={ !details?.ingredients.every((ingredient) => ingredient.checked) }
        className="button-in-progress"
      >
        <Link
          to="/done-recipes"
          aria-disabled={
            !details?.ingredients.every((ingredient) => ingredient.checked)
          }
          className="link-in-progress"
        >
          Finish recipe
        </Link>
      </button>
    </>
  );
}

export default RecipeInProgress;
