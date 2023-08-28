import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { Details, FavoriteRecipe, Ingredient } from '../types';

let apiUrl: string;

function RecipeInProgress() {
  const { id, type } = useParams();
  const [details, setDetails] = useState<Details>(
    { ingredients: [] as Array<Ingredient> } as Details,
  );
  const [isShareIconClicked, setIsShareIconClicked] = useState(false);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);

  if (type === 'meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipes === null) {
      fetch(apiUrl).then((response) => response.json())
        .then(({ meals, drinks }) => {
          const mealsDrinks = (meals || drinks)[0];
          setDetails({
            photo: mealsDrinks.strMealThumb || mealsDrinks.strDrinkThumb,
            title: mealsDrinks.strMeal || mealsDrinks.strDrink,
            category: mealsDrinks.strCategory,
            instructions: mealsDrinks.strInstructions,
            nationality: (mealsDrinks.strArea || ''),
            alcoholicOrNot: (mealsDrinks.strAlcoholic || ''),
            ingredients: Object.entries(mealsDrinks)
              .filter((entrie) => entrie[0].includes('strIngredient'))
              .filter((entrie) => entrie[1] !== '' && entrie[1] !== null)
              .map((entrie) => (
                { label: entrie[1], checked: false }
              )) as Array<Ingredient>,
          });
        });
    } else {
      setDetails(JSON.parse(inProgressRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(details));
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    ) as Array<FavoriteRecipe>;
    favoriteRecipes.forEach((favoriteRecipe) => {
      if (favoriteRecipe.id === id) {
        setIsFavoriteRecipe(true);
      }
    });
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
      console.log(favoriteRecipes.filter((
        currentFavoriteRecipe,
      ) => currentFavoriteRecipe.id !== id));

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
          nationality: details.nationality,
          category: details.category,
          alcoholicOrNot: details.alcoholicOrNot,
          name: details.title,
          image: details.photo,
        }]),
      );
    }

    setIsFavoriteRecipe(!isFavoriteRecipe);
  };

  return (
    <>
      <img src={ details.photo } alt={ details.title } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{details.title}</h2>
      <button data-testid="share-btn" onClick={ copyLink }>
        <img src={ shareIcon } alt="Botão de compartilhar" />
      </button>
      {isShareIconClicked && <span>Link copied!</span>}
      <button onClick={ favoriteRecipe }>
        {
          isFavoriteRecipe
            ? <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="Botão de favoritar selecionado"
            />
            : <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Botão de favoritar desselecionado"
            />
        }
      </button>
      <span data-testid="recipe-category">{details.category}</span>
      <span data-testid="instructions">{details.instructions}</span>
      <ul>
        {
          details.ingredients.map((ingredient, index) => (
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
      <button data-testid="finish-recipe-btn">Finish recipe</button>
    </>
  );
}

export default RecipeInProgress;
