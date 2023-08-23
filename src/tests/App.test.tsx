import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

describe('Testa a Tela de Login', () => {
  test('Testa se o button habilita após escrever o email e senha', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    await userEvent.type(email, 'test@test.com');
    await userEvent.type(password, '1234567');
    await userEvent.click(button);
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
  test('Testa se o button continua desabilitado ao escrever email e senha errado', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    await userEvent.type(email, 'test@test');
    await userEvent.type(password, '123456');
    expect(button).toBeDisabled();
  });
});

describe('Testa o Header', () => {
  test('Testa o Header do Meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const title = screen.getByRole('heading', { name: 'Meals' });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa o Header do Drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const title = screen.getByRole('heading', { name: 'Drinks' });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
  test('Testa o Header do DoneRecipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const title = screen.getByRole('heading', { name: 'Done Recipes' });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });
  test('Testa o Header do FavoriteRecipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
    const title = screen.getByRole('heading', { name: 'Favorite Recipes' });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });
  test('Testa o Header do Profile', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const title = screen.getByRole('heading', { name: 'Profile' });
    const profileIcon = screen.getByTestId('profile-top-btn');
    const buttons = screen.getAllByRole('button');

    expect(title).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });
  test('Testa a barra de busca do header', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByTestId('search-top-btn');

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
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const profileIcon = screen.getByTestId('profile-top-btn');

    await userEvent.click(profileIcon);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  })
});

