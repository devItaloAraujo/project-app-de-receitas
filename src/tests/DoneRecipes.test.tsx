import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import DoneRecipes from '../pages/DoneRecipes';

const BTN_MEAL_TESTID = 'filter-by-meal-btn';
const BTN_DRINK_TESTID = 'filter-by-drink-btn';
const BTN_ALL_TESTID = 'filter-by-all-btn';

const BTN_SHARE_MEAL_TESTID = '0-horizontal-share-btn';
const BTN_SHARE_DRINK_TESTID = '1-horizontal-share-btn';

describe('Testa a Tela de Receitas Feitas', () => {
// Receitas para 'mockar' o LocalStorage
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  test('Testa os se os botões filtram por categoria de receita', async () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );

    // Setando receitas no Local Storage
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    // Botões
    const buttonMeals = screen.getByTestId(BTN_MEAL_TESTID);
    const buttonDrinks = screen.getByTestId(BTN_DRINK_TESTID);
    const buttonAll = screen.getByTestId(BTN_ALL_TESTID);

    const RCP_MEAL = 'Recipe meals';
    const RCP_DRINK = 'Recipe drinks';

    // Testa botão Meals
    await userEvent.click(buttonMeals);
    expect(screen.queryAllByAltText(RCP_MEAL).length).toBeGreaterThan(0);
    expect(screen.queryAllByAltText(RCP_DRINK).length).toBe(0);

    // Testa botão Drinks
    await userEvent.click(buttonDrinks);
    expect(screen.queryAllByAltText(RCP_DRINK).length).toBeGreaterThan(0);
    expect(screen.queryAllByAltText(RCP_MEAL).length).toBe(0);

    // Testa botão All
    await userEvent.click(buttonAll);
    expect(screen.queryAllByAltText(RCP_MEAL).length).toBeGreaterThan(0);
    expect(screen.queryAllByAltText(RCP_DRINK).length).toBeGreaterThan(0);
  });

  test('Testa se o botão de compartilhar copia o endereço da receita pra área de transfêrencia', async () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    // Setando receitas no Local Storage
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    // Mockando a funcão de copiar (writeText)

    const writeText = vi.fn(() => Promise.resolve(undefined));

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    // Testando o botão de compartilhar da Meals

    const buttonShareMeal = screen.getByTestId(BTN_SHARE_MEAL_TESTID);

    await userEvent.click(buttonShareMeal);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');

    // Testando o botão de compartilhar da Drinks

    const buttonShareDrinks = screen.getByTestId(BTN_SHARE_DRINK_TESTID);

    await userEvent.click(buttonShareDrinks);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
  });
});
