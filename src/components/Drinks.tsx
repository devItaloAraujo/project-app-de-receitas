import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { TypeDrinks } from '../types';

function Drinks() {
  const navigate = useNavigate();
  const { mealsOrDrink, dataRecipes } = useContext(RecipesContext);
  const [drinks, setDrinks] = useState<TypeDrinks[]>([]);
  const getRecipesRender = () => {
    if (mealsOrDrink === 'drinks' && drinks.length > 0) {
      return drinks.length < 12 ? drinks : drinks.slice(0, 12);
    }
    return [];
  };

  useEffect(() => {
    if (dataRecipes !== undefined) {
      if (dataRecipes.drinks === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (dataRecipes.drinks) {
        if (dataRecipes.drinks.length === 1) {
          navigate(`/drinks/${dataRecipes.drinks[0].idDrink}`);
        } else {
          setDrinks(dataRecipes.drinks);
        }
      }
    }
  }, [dataRecipes, navigate]);

  const renderRecipes = getRecipesRender();
  return (
    <>
      { renderRecipes.map((drink: TypeDrinks, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt="Recipe drinks"
          />
          <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
        </div>
      )) }
    </>
  );
}

export default Drinks;
