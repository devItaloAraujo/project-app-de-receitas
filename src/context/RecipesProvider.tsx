import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { DataType } from '../types';

type RecipesProviderProps = {
  children: React.ReactNode;
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [dataRecipes, setDataRecipes] = useState<DataType>({});
  const location = useLocation();

  async function searchEndPoint(radio: string, value: string) {
    if (location.pathname === '/meals') {
      let API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      if (radio === 'ingredient') {
        API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      } else if (radio === 'name') {
        API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
      } else {
        API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
      }
      fetchData(API);
    } else if (location.pathname === '/drinks') {
      let API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
      if (radio === 'ingredient') {
        API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
      } else if (radio === 'name') {
        API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
      } else {
        API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
      }
      fetchData(API);
    }
  }

  async function fetchRecipeById(id: string) {
    if (location.pathname.includes('/meals')) {
      const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetchData(API);
    } if (location.pathname.includes('/drinks')) {
      const API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      fetchData(API);
    }
  }

  const fetchData = async (API: string) => {
    const response = await fetch(API);
    const data = await response.json();
    setDataRecipes(data);
  };

  const context = {
    dataRecipes,
    searchEndPoint,
    fetchRecipeById,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
