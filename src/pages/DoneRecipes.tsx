import Header from '../components/Header';

const favoriteRecipes = [];

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" perfil pesquisa={ false } />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipes;
