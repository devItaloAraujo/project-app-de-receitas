import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { TypeMeals } from '../types';

function Meals() {
  const navigate = useNavigate();
  const { mealsOrDrink, dataRecipes } = useContext(RecipesContext);
  const [meals, setMeals] = useState<TypeMeals[]>([]);

  const getRecipesRender = () => {
    if (mealsOrDrink === 'meals' && meals.length > 0) {
      return meals.length < 12 ? meals : meals.slice(0, 12);
    }
    return [];
  };

  useEffect(() => {
    if (dataRecipes !== undefined) {
      if (dataRecipes.meals === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (dataRecipes.meals) {
        if (dataRecipes.meals.length === 1) {
          navigate(`/meals/${dataRecipes.meals[0].idMeal}`);
        } else {
          setMeals(dataRecipes.meals);
          console.log(meals);
        }
      }
    }
  }, [dataRecipes, meals, navigate]);

  const renderRecipes = getRecipesRender();

  return (
    <>
      { renderRecipes.map((meal: TypeMeals, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <button onClick={ () => { navigate(`/meals/${meal.idMeal}`); } }>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt="Recipe meals"
            />
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
          </button>
        </div>
      ))}
    </>
  );
}

export default Meals;
