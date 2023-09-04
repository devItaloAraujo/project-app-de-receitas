import Flicking from '@egjs/react-flicking';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ShareFavButton from '../components/ShareFavButton';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  Details,
  Ingredient,
  Progress, Recommendation, TypeFavoriteRecipes,
} from '../types';
import './Details.css';

function RecipeDetails() {
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipeDetailData, setRecipeDetailData] = useState<Details>();
  const [recomendations, setRecomendations] = useState<Array<Recommendation>>([]);
  const [copyMessage, SetCopyMessage] = useState(false);
  const {
    valueStorage: favoriteRecipes,
    setValue: setFavoriteRecipes,
  } = useLocalStorage('favoriteRecipes', []);
  const recommendationAPI = type === 'meals'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const getIngredients = (mealsDrinks: any) => Object.entries(mealsDrinks)
    .filter((entrie) => entrie[0].includes('strIngredient'))
    .filter((entrie) => entrie[1] !== '' && entrie[1] !== null)
    .map((entrie) => (
      { label: entrie[1], checked: false }
    )) as Array<Ingredient>;

  const getMeasures = (mealsDrinks: any) => Object.entries(mealsDrinks)
    .filter((entrie) => entrie[0].includes('strMeasure'))
    .filter((entrie) => entrie[1] !== '' && entrie[1] !== null)
    .map((entrie) => entrie[1]) as Array<string>;

  useEffect(() => {
    async function fetchRecipeById() {
      const API = type === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(API);
      const { drinks, meals } = await response.json();
      const mealsDrinks = (meals || drinks)[0];
      setRecipeDetailData({
        id: id || '',
        photo: mealsDrinks.strMealThumb || mealsDrinks.strDrinkThumb,
        title: mealsDrinks.strMeal || mealsDrinks.strDrink,
        category: mealsDrinks.strCategory,
        instructions: mealsDrinks.strInstructions,
        nationality: (mealsDrinks.strArea || ''),
        alcoholicOrNot: (mealsDrinks.strAlcoholic || ''),
        tags: mealsDrinks.strTags ? mealsDrinks.strTags.split(',') : [],
        youtube: (mealsDrinks.strYoutube || ''),
        ingredients: getIngredients(mealsDrinks),
        measures: getMeasures(mealsDrinks),
      });
    }

    async function fetchRecommendations() {
      const response = await fetch(recommendationAPI);
      const { drinks, meals } = await response.json();
      const mealsDrinks = (meals || drinks);
      setRecomendations(mealsDrinks.map((mealDrink: any) => ({
        photo: mealDrink.strMealThumb || mealDrink.strDrinkThumb,
        title: mealDrink.strMeal || mealDrink.strDrink,
      })));
    }

    if (id !== undefined) {
      fetchRecipeById();
      fetchRecommendations();
    }
  }, [id, type, recommendationAPI]);

  const renderRecomendations = recomendations.slice(0, 6);

  const handleClickShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      SetCopyMessage(true);
      setTimeout(() => SetCopyMessage(false), 2000);
    });
  };

  const handleClickFavoriteLocalStorage = () => {
    if (recipeDetailData) {
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
          id: recipeDetailData.id,
          type: type?.substring(0, type.length - 1) as string,
          nationality: recipeDetailData.nationality,
          category: recipeDetailData.category,
          alcoholicOrNot: recipeDetailData.alcoholicOrNot,
          name: recipeDetailData.title,
          image: recipeDetailData.photo,
        }];
        setFavoriteRecipes([...favoriteRecipes, ...newFavoriteRecipe]);
      }
    }
  };

  const isFavorite = favoriteRecipes
    .some((recipe: { id: string | undefined; }) => recipe.id === id);

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
      <div className="details">
        <img
          className="w-100"
          data-testid="recipe-photo"
          src={ recipeDetailData?.photo }
          alt={ recipeDetailData?.title }
        />
        <h1 data-testid="recipe-title">{recipeDetailData?.title}</h1>
        <p data-testid="recipe-category">
          Categoria:
          {' '}
          {recipeDetailData?.category}
          {' '}
          {recipeDetailData?.alcoholicOrNot}
        </p>
        <h3>Ingredientes</h3>
        <ul>
          {
            recipeDetailData?.ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {
                  `${ingredient.label} - ${recipeDetailData?.measures
                    ? recipeDetailData?.measures[index]
                    : ''
                  }`
                }
              </li>
            ))
          }
        </ul>
        <h3>Instruções</h3>
        <p data-testid="instructions">{recipeDetailData?.instructions}</p>
        {
          type === 'meals' && (
            <div className="video">
              <iframe
                data-testid="video"
                width="300"
                height="150"
                src={ recipeDetailData?.youtube?.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                allow="accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share"
              />
            </div>
          )
        }
        <h3>Recomendações</h3>
        <div className="mb-1">
          <Flicking
            gap={ 10 }
            align="prev"
            bound
          >
            {renderRecomendations.length === 6
              && renderRecomendations.map((drink, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  className="w-50"
                >
                  <img
                    src={ drink.photo }
                    alt={ drink.title }
                    className="w-100"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.title}
                  </p>
                </div>
              ))}
          </Flicking>
        </div>
      </div>
      <button
        className="btn btn-primary btn-lg fixed-bottom"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => navigate(`${location.pathname}/in-progress`) }
      >
        {
          localStorage.getItem('inProgressRecipes') as string
            && (JSON.parse(
              localStorage.getItem('inProgressRecipes') as string,
            ) as Progress)[type as string][id as string]
            ? 'Continue Recipe'
            : ' Start Recipe'
        }
      </button>
    </div>
  );
}

export default RecipeDetails;
