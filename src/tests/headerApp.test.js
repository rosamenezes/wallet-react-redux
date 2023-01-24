import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Header', () => {
  it('Testa render Header', () => {
    const { history } = renderWithRouterAndRedux(<Header />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0');
    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toBeInTheDocument();
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
});

describe('Testa App', () => {
  it('Verifica se o componente App', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
});
