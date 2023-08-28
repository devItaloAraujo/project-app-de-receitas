import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { Details, Ingredient } from '../types';

let url: string;

function RecipeInProgress() {
  const { id, type } = useParams();
  const [details, setDetails] = useState<Details>(
    { ingredients: [] as Array<Ingredient> } as Details,
  );

  if (type === 'meals') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipes === null) {
      fetch(url).then((response) => response.json())
        .then(({ meals, drinks }) => {
          const mealsDrinks = (meals || drinks)[0];
          setDetails({
            photo: mealsDrinks.strMealThumb || mealsDrinks.strDrinkThumb,
            title: mealsDrinks.strMeal || mealsDrinks.strDrink,
            category: mealsDrinks.strCategory,
            instructions: mealsDrinks.strInstructions,
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
  }, [details]);

  return (
    <>
      <img src={ details.photo } alt={ details.title } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{details.title}</h2>
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="Botão de compartilhar" />
      </button>
      <button data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="Botão de favoritar" />
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
