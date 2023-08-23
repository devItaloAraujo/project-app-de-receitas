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
  })
});
