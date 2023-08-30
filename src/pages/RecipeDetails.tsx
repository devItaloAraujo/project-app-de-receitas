import { useLocation } from 'react-router-dom';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';

function RecipeDetails() {
  const location = useLocation();

  return (
    <>
      { location.pathname.includes('/meals')
      && <MealDetail /> }
      { location.pathname.includes('/drinks')
      && <DrinkDetail />}
    </>
  );
}

export default RecipeDetails;
