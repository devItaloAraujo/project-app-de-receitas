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
