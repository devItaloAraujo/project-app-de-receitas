export type DataType = {
  meals?: TypeMeals[];
  drinks?: TypeDrinks[];
};

export type TypeMeals = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string | any;
  strIngredient2: string | any;
  strIngredient3: string | any;
  strIngredient4: string | any;
  strIngredient5: string | any;
  strIngredient6: string | any;
  strIngredient7: string | any;
  strIngredient8: string | any;
  strIngredient9: string | any;
  strIngredient10: string | any;
  strIngredient11: string | any;
  strIngredient12: string | any;
  strIngredient13: string | any;
  strIngredient14: string | any;
  strIngredient15: string | any;
  strIngredient16: string | any;
  strIngredient17: string | any;
  strIngredient18: string | any;
  strIngredient19: string | any;
  strIngredient20: string | any;
  strMeasure1: string | any;
  strMeasure2: string | any;
  strMeasure3: string | any;
  strMeasure4: string | any;
  strMeasure5: string | any;
  strMeasure6: string | any;
  strMeasure7: string | any;
  strMeasure8: string | any;
  strMeasure9: string | any;
  strMeasure10: string | any;
  strMeasure11: string | any;
  strMeasure12: string | any;
  strMeasure13: string | any;
  strMeasure14: string | any;
  strMeasure15: string | any;
  strMeasure16: string | any;
  strMeasure17: string | any;
  strMeasure18: string | any;
  strMeasure19: string | any;
  strMeasure20: string | any;
  strSource: string;
  dateModified: null;
};

export type TypeDrinks = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string;
  strTags: string;
  strVideo: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: null;
  strInstructionsDE: string;
  strInstructionsFR: null;
  strInstructionsIT: string;
  strInstructionsZH_HANS: null;
  strInstructionsZH_HANT: null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type TypeDoneRecipes = {
  id: string;
  type: string;
  nationality: string | null;
  category: string | null;
  alcoholicOrNot: string | null;
  name: string;
  image: string;
  doneDate: string;
  tags: string[] | null;
}[];

export type TypeFavoriteRecipes = {
  id: string;
  type: string;
  nationality: string | null;
  category: string | null;
  alcoholicOrNot: string | null;
  name: string;
  image: string;
}[];

export type Details = {
  id: string,
  photo: string,
  title: string,
  category: string,
  instructions: string,
  nationality: string,
  alcoholicOrNot: string,
  tags: Array<string>,
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

export type DoneRecipe = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  tags: Array<string>,
  doneDate: string,
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
