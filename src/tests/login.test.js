import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Login', () => {
  it('Testa render Login', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailConst = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    userEvent.type(emailConst, 'teste@gmail.com');
    userEvent.type(password, 'guilherme123456');
    userEvent.click(button);

    const { user: { email } } = store.getState();
    expect(email).toBe('teste@trybe.com');
  });
});
