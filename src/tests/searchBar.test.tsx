import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import { firtsLetterMock } from './mock/firstLetter.mock';
import { ingredientMock } from './mock/ingredient.mock';
import { recipesResponse } from './mock/recipes.mock';

const SEARCH_ICON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_BUTTON = 'exec-search-btn';

describe('Testa o SearchBar com busca pela primeira letra', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (firtsLetterMock),
    });
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  test('Testa a pesquisa pela primeira letra', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(SEARCH_BUTTON);
    await userEvent.type(searchInput, 'a');
    await userEvent.click(firstLetterRadio);
    await userEvent.click(buttonSearch);

    await screen.findByText('Apam balik');
  });
  test('Verifica o alert se pesquisar duas letras', async () => {
    window.alert = vi.fn();
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(SEARCH_BUTTON);
    await userEvent.type(searchInput, 'ab');
    await userEvent.click(firstLetterRadio);
    await userEvent.click(buttonSearch);
    expect(window.alert).toBeCalled();
  });
});

describe('Testa SearchBar com busca por ingredient', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (ingredientMock),
    });
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  test('Testa a busca pelo ingrediente', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId(SEARCH_BUTTON);
    await userEvent.type(searchInput, 'Chicken');
    await userEvent.click(ingredientRadio);
    await userEvent.click(buttonSearch);
    await screen.findByText('Chicken Couscous');
  });
});

describe('Testa o SearchBar pelo nome', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (recipesResponse),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  test('Testa a busca pelo nome', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId(SEARCH_BUTTON);

    await userEvent.type(searchInput, 'Teriyaki Chicken Casserole');
    await userEvent.click(nameRadio);
    await userEvent.click(buttonSearch);
    const titleName = await screen.findByText('Teriyaki Chicken Casserole');
    expect(titleName).toBeInTheDocument();
  });
});
