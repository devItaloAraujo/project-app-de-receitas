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
  ingredients: Array<Ingredient>,
};

export type Ingredient = {
  label: string,
  checked: boolean,
};
