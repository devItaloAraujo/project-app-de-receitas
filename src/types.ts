export type DataType = {
  meals?: TypeMeals[];
  drinks?: TypeDrinks[];
};

export type TypeMeals = {
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
};

export type TypeDrinks = {
  strDrink: string;
  idDrink: string;
  strDrinkThumb: string;
};

export type Details = {
  photo: string,
  title: string,
  category: string,
  instructions: string,
  nationality: string,
  alcoholicOrNot: string,
  ingredients: Array<Ingredient>,
};

export type Ingredient = {
  label: string,
  checked: boolean,
};

export type FavoriteRecipe = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};
