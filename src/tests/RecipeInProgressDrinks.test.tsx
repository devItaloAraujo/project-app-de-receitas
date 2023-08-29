import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { expect, vi } from 'vitest';
import App from '../App';
import { drinksResponse } from './mock/drinksById.mock';
import { renderWithRouter } from './renderWithRouter';

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (drinksResponse),
  });
  await act(() => renderWithRouter(<App />, { initialEntries: ['/drinks/52772/in-progress'] }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes tela de receitas em progresso', async () => {
  test('Deve carregar a imagem da receita ao renderizar a página', async () => {
    const recipePhoto = screen.getByTestId('recipe-photo');

    expect(recipePhoto.getAttribute('src')).toEqual(drinksResponse.drinks[0].strDrinkThumb);
  });

  test('Deve carregar o título da receita ao renderizar a página', async () => {
    const recipeTitle = screen.getByTestId('recipe-title');

    expect(recipeTitle.textContent).toEqual(drinksResponse.drinks[0].strDrink);
  });

  test('Deve carregar a categoria da receita ao renderizar a página', async () => {
    const recipeCategory = screen.getByTestId('recipe-category');

    expect(recipeCategory.textContent).toEqual(drinksResponse.drinks[0].strCategory);
  });

  test('Deve carregar as instruções da receita ao renderizar a página', async () => {
    const instructions = screen.getByTestId('instructions');

    expect(instructions.textContent).toEqual(drinksResponse.drinks[0].strInstructions);
  });

  test('Deve carregar os igredientes da receita ao renderizar a página', async () => {
    const ingredients = screen.getAllByRole('listitem');

    expect(ingredients.length).toEqual(4);
    expect(ingredients[0].textContent?.trim()).toEqual('Tequila');
    expect(ingredients[1].textContent?.trim()).toEqual('Triple sec');
    expect(ingredients[2].textContent?.trim()).toEqual('Lime juice');
    expect(ingredients[3].textContent?.trim()).toEqual('Salt');
  });
});
