import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { Details } from '../types';

let url: string;

function RecipeInProgress() {
  const { id, type } = useParams();
  const [details, setDetails] = useState<Details>({} as Details);

  if (type === 'meals') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then(({ meals, drinks }) => {
        const mealsDrinks = (meals || drinks)[0];
        setDetails({
          photo: mealsDrinks.strMealThumb || mealsDrinks.strDrinkThumb,
          title: mealsDrinks.strMeal || mealsDrinks.strDrink,
          category: mealsDrinks.strCategory,
          instructions: mealsDrinks.strInstructions,
        });
      });
  }, []);

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
      <button data-testid="finish-recipe-btn">Finish recipe</button>
    </>
  );
}

export default RecipeInProgress;
