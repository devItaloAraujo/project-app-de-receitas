import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Flicking from '@egjs/react-flicking';
import { DataType, TypeMeals } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';

function DrinkDetail() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipeDetailData, setRecipeDetailData] = useState<DataType>({});
  const [meals, setMeals] = useState<TypeMeals[]>([]);

  async function fetchRecipeById() {
    if (location.pathname.includes('/meals')) {
      const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.idDaReceita}`;
      const response = await fetch(API);
      const data = await response.json();
      setRecipeDetailData(data);
    } if (location.pathname.includes('/drinks')) {
      const API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.idDaReceita}`;
      const response = await fetch(API);
      const data = await response.json();
      setRecipeDetailData(data);
    }
  }

  useEffect(() => {
    if (params.idDaReceita !== undefined) {
      fetchRecipeById();
      fetchRecommendations();
    }
  }, [params.idDaReceita]);

  console.log(recipeDetailData);

  const recommendationType = location.pathname.includes('/meals') ? 'bebida' : 'comida';
  const recommendationAPI = recommendationType === 'bebida'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  async function fetchRecommendations() {
    const response = await fetch(recommendationAPI);
    const data = await response.json();
    setMeals(data.meals);
  }

  console.log(meals);

  const renderRecomendations = meals.slice(0, 6);
  console.log(renderRecomendations);

  return (
    <div>
      { recipeDetailData.drinks?.map((drink) => (
        <div key={ drink.idDrink }>
          <img
            className="w-100"
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <p data-testid="recipe-category">
            Alcoólico:
            { ' ' }
            { drink.strAlcoholic }
          </p>
          <h3>Ingredientes</h3>
          <ul>
            { [...Array(20).keys()]
              .filter((number) => drink[`strIngredient${number + 1}` as keyof typeof
                drink])
              .map((number) => (
                <li
                  key={ number }
                  data-testid={ `${number}-ingredient-name-and-measure` }
                >
                  { `${drink[`strIngredient${number + 1}` as keyof typeof drink]}
                  - ${drink[`strMeasure${number + 1}` as keyof typeof drink]}` }
                </li>
              )) }
          </ul>
          <h3>Instruções</h3>
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <h3>Recomendações</h3>
          <div className="mb-1">
            <Flicking
              gap={ 10 }
              // panelsPerView={ 2 }
              align="prev"
              bound
              // noPanelStyleOverride={ false }
            >
              { renderRecomendations.length === 6
              && renderRecomendations.map((meal, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  className="w-50"
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    className="w-100"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { meal.strMeal }
                  </p>
                </div>
              ))}
            </Flicking>
          </div>
        </div>
      ))}
      <button
        className="btn btn-primary btn-lg fixed-bottom"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`${location.pathname}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default DrinkDetail;
