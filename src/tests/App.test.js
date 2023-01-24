import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import Table from '../components/Table';
import Login from '../pages/Login';
import WalletForm from '../components/WalletForm';
import App from '../App';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Login', () => {
  it('testa inputs Login', () => {
    renderWithRedux(<Login />);

    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');

    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  it('testa se o email fica na store', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');
    const button = screen.getByRole('button');

    userEvent.type(email, 'teste@gmail.com');
    userEvent.type(password, 'teste12345');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testa component Header', () => {
  it('testa se os componentes sao renderizados', () => {
    renderWithRedux(<Header />);

    const total = screen.getByTestId('total-field');
    const email = screen.getByTestId('email-field');
    const moeda = screen.getByTestId('header-currency-field');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
    expect(email).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(moeda).toHaveTextContent('BRL');
  });
});

describe('Testa Table', () => {
  it('testa render', () => {
    renderWithRedux(<Table />);
  });
});

describe('Testa WalletForm', () => {
  it('testa inputs', () => {
    renderWithRedux(<WalletForm />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tags = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
  });
  it('testa click', () => {
    renderWithRedux(<WalletForm />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tags = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(value, '3000');
    userEvent.type(description, 'roupas');
    userEvent.type(currency, 'EUR');
    userEvent.type(method, 'Cartão de crédito');
    userEvent.type(tags, 'Lazer');
    userEvent.click(button);
  });
});
