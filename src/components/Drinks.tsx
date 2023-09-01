import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { apiCall } from '../helpers/apiCall';
import { TypeDrinks } from '../types';

const API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const API_DRINKS_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function Drinks() {
  const navigate = useNavigate();
  const { dataRecipes } = useContext(RecipesContext);
  const [drinks, setDrinks] = useState<TypeDrinks[]>([]);
  const [drinksCategoryList, setDrinksCategoryList] = useState<[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const location = useLocation();

  const getRecipesRender = () => {
    if (location.pathname === '/drinks' && drinks.length > 0) {
      return drinks.length < 12 ? drinks : drinks.slice(0, 12);
    }
    return [];
  };

  useEffect(() => {
    const getDrinks = async () => {
      const apiDrinks = await apiCall(API_DRINKS);
      setDrinks(apiDrinks.drinks);
      const apiDrinksCategory = await apiCall(API_DRINKS_CATEGORY);
      setDrinksCategoryList(apiDrinksCategory.drinks);
      setCurrentCategory(null);
    };
    getDrinks();
  }, []);

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

  // const categoryClick = async ({ target }: any) => {
  //   const valueClick = target.id;
  //   const filterCategoryDrinks = await apiCall(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${valueClick}`);
  //   setDrinks(filterCategoryDrinks.drinks);
  // };

  const categoryClick = async ({ target }: any) => {
    const valueClick = target.id;
    if (valueClick !== currentCategory) {
      const filterCategoryDrinks = await apiCall(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${valueClick}`);
      setDrinks(filterCategoryDrinks.drinks);
      setCurrentCategory(valueClick);
    } else {
      const apiDrinks = await apiCall(API_DRINKS);
      setDrinks(apiDrinks.drinks);
      setCurrentCategory(null);
    }
  };

  const categoryByAll = async () => {
    const apiDrinks = await apiCall(API_DRINKS);
    setDrinks(apiDrinks.drinks);
  };

  const renderRecipes = getRecipesRender();
  console.log(renderRecipes);

  return (
    <>
      <div className="category-container">
        { drinksCategoryList.slice(0, 5).map((category: any, index: number) => (
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
        { renderRecipes.map((drink: TypeDrinks, index) => (
          <Link to={ `/drinks/${drink.idDrink}` } key={ index } className="recipes-link">
            <div className="recipes" data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt="Recipe drinks"
              />
              <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
            </div>
          </Link>
        )) }
      </div>
    </>
  );
}

export default Drinks;
