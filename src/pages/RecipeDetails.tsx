import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DataType, TypeDrinks } from '../types';

function RecipeDetails() {
  const params = useParams();
  const location = useLocation();
  const [recipeDetailData, setRecipeDetailData] = useState<DataType>({});
  const [drinks, setDrinks] = useState<TypeDrinks[]>([]);

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
    setDrinks(data.drinks);
  }

  console.log(drinks);

  const renderRecomendations = drinks.slice(0, 6);
  console.log(renderRecomendations);

  return (
    <div>
      { recipeDetailData.meals?.map((meal) => (
        <div key={ meal.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
          <p data-testid="recipe-category">
            Categoria:
            { ' ' }
            { meal.strCategory }
          </p>
          <h3>Ingredientes</h3>
          <ul>
            { [...Array(20).keys()]
              .filter((number) => meal[`strIngredient${number + 1}` as keyof typeof meal])
              .map((number) => (
                <li
                  key={ number }
                  data-testid={ `${number}-ingredient-name-and-measure` }
                >
                  { `${meal[`strIngredient${number + 1}` as keyof typeof meal]}
                  - ${meal[`strMeasure${number + 1}` as keyof typeof meal]}` }
                </li>
              )) }
          </ul>
          <h3>Instruções</h3>
          <p data-testid="instructions">{ meal.strInstructions }</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ meal.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share"
          />
          <h3>Recomendações</h3>
          <div className="carousel-container">
            { renderRecomendations.map((drink, index) => (
              <div key={ index } className="carousel-card">
                <img
                  data-testid={ `${index}-recomendation-card` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetails;
