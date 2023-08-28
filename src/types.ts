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

export type RecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name:string;
  image:string;
  doneDate:string;
  tags:string[];
};
