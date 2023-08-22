import { createContext } from 'react';
import { DataType } from '../types';

type RecipeContextType = {
  dataRecipes: DataType;
  mealsOrDrink: string;
  searchEndPoint: (radio: string, value: string) => void;
};

const RecipesContext = createContext({} as RecipeContextType);

export default RecipesContext;
