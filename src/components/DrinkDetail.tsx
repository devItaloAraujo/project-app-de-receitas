import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Flicking from '@egjs/react-flicking';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { DataType, TypeFavoriteRecipes, TypeMeals } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShareFavButton from './ShareFavButton';
import useLocalStorage from '../hooks/useLocalStorage';

function DrinkDetail() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipeDetailData, setRecipeDetailData] = useState<DataType>({});
  const [meals, setMeals] = useState<TypeMeals[]>([]);
  const [copyMessage, SetCopyMessage] = useState(false);
  const {
    valueStorage: favoriteRecipes,
    setValue: setFavoriteRecipes,
  } = useLocalStorage('favoriteRecipes', []);

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

  const recommendationType = location.pathname.includes('/meals') ? 'drinks' : 'meals';
  const recommendationAPI = recommendationType === 'drinks'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  async function fetchRecommendations() {
    const response = await fetch(recommendationAPI);
    const data = await response.json();
    setMeals(data.meals);
  }

  const renderRecomendations = meals.slice(0, 6);

  const handleClickShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      SetCopyMessage(true);
      setTimeout(() => SetCopyMessage(false), 2000);
    });
  };

  const handleClickFavoriteLocalStorage = () => {
    if (recipeDetailData.drinks) {
      const id = recipeDetailData.drinks[0].idDrink;
      const isCurrentlyFavorited = favoriteRecipes.some(
        (recipe: { id: string | undefined }) => recipe.id === id,
      );
      if (isCurrentlyFavorited) {
        const updatedFavoriteRecipes = favoriteRecipes.filter(
          (recipe: { id: string | undefined }) => recipe.id !== id,
        );
        setFavoriteRecipes(updatedFavoriteRecipes);
      } else {
        const newFavoriteRecipe: TypeFavoriteRecipes = [{
          id: recipeDetailData.drinks[0].idDrink,
          type: 'drink',
          nationality: '',
          category: recipeDetailData.drinks[0].strCategory,
          alcoholicOrNot: recipeDetailData.drinks[0].strAlcoholic,
          name: recipeDetailData.drinks[0].strDrink,
          image: recipeDetailData.drinks[0].strDrinkThumb,
        }];
        setFavoriteRecipes([...favoriteRecipes, ...newFavoriteRecipe]);
      }
    }
  };

  const isFavorite = favoriteRecipes
    .some((recipe: { id: string | undefined; }) => recipe.id === params.idDaReceita);

  return (
    <div>
      <ShareFavButton
        src={ shareIcon }
        alt="share"
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShare }
      />
      <ShareFavButton
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteLocalStorage }
      />
      <div>
        {copyMessage && <p>Link copied!</p>}
      </div>
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
        { JSON.parse(localStorage.getItem('inProgressRecipes') as string) !== null
          && JSON.parse(localStorage.getItem('inProgressRecipes') as string)
            .drinks[`${params.idDaReceita}`] ? 'Continue Recipe' : ' Start Recipe' }
      </button>
    </div>
  );
}

export default DrinkDetail;
