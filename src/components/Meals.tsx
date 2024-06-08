import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { TypeMeals } from '../types';
import { apiCall } from '../helpers/apiCall';
import './Recipes.css';

const API_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_MEALS_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

function Meals() {
  const navigate = useNavigate();
  const { dataRecipes } = useContext(RecipesContext);
  const [meals, setMeals] = useState<TypeMeals[]>([]);
  const [mealsCategoryList, setMealsCategoryList] = useState<[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const location = useLocation();

  const getRecipesRender = () => {
    if (location.pathname === '/meals' && meals.length > 0) {
      return meals.length < 12 ? meals : meals.slice(0, 6);
    }
    return [];
  };

  useEffect(() => {
    const getMeals = async () => {
      const apiMeals = await apiCall(API_MEALS);
      setMeals(apiMeals.meals);
      const apiMealsCategory = await apiCall(API_MEALS_CATEGORY);
      setMealsCategoryList(apiMealsCategory.meals);
      setCurrentCategory(null);
    };
    getMeals();
  }, []);

  useEffect(() => {
    if (dataRecipes !== undefined) {
      if (dataRecipes.meals === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (dataRecipes.meals) {
        if (dataRecipes.meals.length === 1) {
          navigate(`/meals/${dataRecipes.meals[0].idMeal}`);
        } else {
          setMeals(dataRecipes.meals);
        }
      }
    }
  }, [dataRecipes, meals, navigate]);

  const renderRecipes = getRecipesRender();

  const categoryClick = async ({ target }: any) => {
    const valueClick = target.id;

    if (valueClick !== currentCategory) {
      const filterCategoryMeals = await apiCall(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${valueClick}`);
      setMeals(filterCategoryMeals.meals);
      setCurrentCategory(valueClick);
    } else {
      const apiMeals = await apiCall(API_MEALS);
      setMeals(apiMeals.meals);
      setCurrentCategory(null);
    }
  };

  const categoryByAll = async () => {
    const apiMeals = await apiCall(API_MEALS);
    setMeals(apiMeals.meals);
  };

  return (
    <div className="gray-bg">
      <div className="category-container">
        { mealsCategoryList.slice(0, 5).map((category: any, index: number) => (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            id={ category.strCategory }
            className="category-icon"
            onClick={ categoryClick }
          >
            { category.strCategory }
          </button>
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          className="category-icon"
          onClick={ categoryByAll }
        >
          All
        </button>
      </div>
      <div className="cards">
        { renderRecipes.map((meal: TypeMeals, index) => (
          <Link to={ `/meals/${meal.idMeal}` } key={ index } className="recipes-link">
            <div className="recipes" data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt="Recipe meals"
              />
              <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Meals;
