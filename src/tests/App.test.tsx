import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import { recipesResponse } from './mock/recipes.mock';

const EMAIL_TESTID = 'email-input';
const PASSWORD_TESTID = 'password-input';
const BUTTON_TESTID = 'login-submit-btn';
const emailTest = 'test@test.com';
const passwordTest = '1234567';

describe('Testa a Tela de Login', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (recipesResponse),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('Testa se o button habilita após escrever o email e senha', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    expect(button).toBeDisabled();

    await userEvent.type(email, emailTest);
    await userEvent.type(password, passwordTest);
    await userEvent.click(button);
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
  test('Testa se o button continua desabilitado ao escrever email e senha errado', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    await userEvent.type(email, 'test@test');
    await userEvent.type(password, '123456');
    expect(button).toBeDisabled();
  });
});

describe('Testa o Header', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (recipesResponse),
    });
    window.alert = vi.fn(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const PROFILE_ICON = 'profile-top-btn';
  const SEARCH_ICON = 'search-top-btn';
  test('Testa o Header do Meals', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/meals'] },
    );
    const title = screen.getByRole('heading', { name: 'MEALS' });
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa o Header do Drinks', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/drinks'] },
    );
    const title = screen.getByRole('heading', { name: 'DRINKS' });
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa o Header do DoneRecipes', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/done-recipes'] },
    );
    const title = screen.getByRole('heading', { name: 'DONE RECIPES' });
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(4);
  });
  test('Testa o Header do FavoriteRecipes', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/favorite-recipes'] },
    );
    const title = screen.getByRole('heading', { name: 'FAVORITES' });
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(4);
  });
  test('Testa o Header do Profile', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const title = screen.getByRole('heading', { name: 'PROFILE' });
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(4);
  });
  test('Testa a barra de busca do header', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
        { initialEntries: ['/meals'] },
      );
    });
    const searchIcon = screen.getByTestId(SEARCH_ICON);

    await userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
  test('Testa se ao clicar no icone de perfil, navega ate a profile', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
        { initialEntries: ['/meals'] },
      );
    });
    const profileIcon = screen.getByTestId(PROFILE_ICON);

    await userEvent.click(profileIcon);
    expect(screen.getByText('PROFILE')).toBeInTheDocument();
  });
});

describe('Testa a Tela de Perfil', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (recipesResponse),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  const PROFILE_ICON = 'profile-top-btn';
  test('Testa os elementos do profile', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    await userEvent.type(email, emailTest);
    await userEvent.type(password, passwordTest);
    await userEvent.click(button);

    const profileIcon = screen.getByTestId(PROFILE_ICON);
    await userEvent.click(profileIcon);

    const emailHeading = screen.getByRole('heading', { name: 'test@test.com' });
    const buttonDone = screen.getByTestId('profile-done-btn');
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');

    expect(emailHeading).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
  test('Testa o click do button Done', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    await userEvent.type(email, emailTest);
    await userEvent.type(password, passwordTest);
    await userEvent.click(button);
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    await userEvent.click(profileIcon);
    const buttonDone = screen.getByTestId('profile-done-btn');
    await userEvent.click(buttonDone);
    const doneTitle = screen.getByText('DONE RECIPES');
    expect(doneTitle).toBeInTheDocument();
  });
  test('Testa o click do button Favorite', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    await userEvent.type(email, emailTest);
    await userEvent.type(password, passwordTest);
    await userEvent.click(button);
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    await userEvent.click(profileIcon);
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(buttonFavorite);
    const favoriteTitle = screen.getByText('FAVORITES');
    expect(favoriteTitle).toBeInTheDocument();
  });
  test('Testa o button LogOut', async () => {
    act(() => {
      renderWithRouter(
        <RecipesProvider>
          <App />
        </RecipesProvider>,
      );
    });
    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    await userEvent.type(email, emailTest);
    await userEvent.type(password, passwordTest);
    await userEvent.click(button);
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    await userEvent.click(profileIcon);
    const logout = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logout);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });
});
