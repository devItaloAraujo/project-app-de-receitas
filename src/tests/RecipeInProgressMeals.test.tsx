import { screen } from '@testing-library/dom';
import { expect, vi } from 'vitest';
import { act } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';
import { mealsResponse } from './mock/mealsById.mock';

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (mealsResponse),
  });
  await act(() => renderWithRouter(<App />, { initialEntries: ['/meals/52772/in-progress'] }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes tela de receitas em progresso', async () => {
  test('Deve carregar a imagem da receita ao renderizar a página', async () => {
    const recipePhoto = screen.getByTestId('recipe-photo');

    expect(recipePhoto.getAttribute('src')).toEqual(mealsResponse.meals[0].strMealThumb);
  });

  test('Deve carregar o título da receita ao renderizar a página', async () => {
    const recipeTitle = screen.getByTestId('recipe-title');

    expect(recipeTitle.textContent).toEqual(mealsResponse.meals[0].strMeal);
  });

  test('Deve carregar a categoria da receita ao renderizar a página', async () => {
    const recipeCategory = screen.getByTestId('recipe-category');

    expect(recipeCategory.textContent).toEqual(mealsResponse.meals[0].strCategory);
  });

  test('Deve carregar as instruções da receita ao renderizar a página', async () => {
    const instructions = screen.getByTestId('instructions');

    expect(instructions.textContent).toEqual(mealsResponse.meals[0].strInstructions);
  });

  test('Deve carregar os igredientes da receita ao renderizar a página', async () => {
    const ingredients = screen.getAllByRole('listitem');

    expect(ingredients.length).toEqual(9);
    expect(ingredients[0].textContent?.trim()).toEqual('soy sauce');
    expect(ingredients[1].textContent?.trim()).toEqual('water');
    expect(ingredients[2].textContent?.trim()).toEqual('brown sugar');
    expect(ingredients[3].textContent?.trim()).toEqual('ground ginger');
    expect(ingredients[4].textContent?.trim()).toEqual('minced garlic');
    expect(ingredients[5].textContent?.trim()).toEqual('cornstarch');
    expect(ingredients[6].textContent?.trim()).toEqual('chicken breasts');
    expect(ingredients[7].textContent?.trim()).toEqual('stir-fry vegetables');
    expect(ingredients[8].textContent?.trim()).toEqual('brown rice');
  });
});
