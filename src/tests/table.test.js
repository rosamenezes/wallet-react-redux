import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setTimeout } from 'timers/promises';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Table', () => {
  it('Testa Table', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const constValue = 'value-input';
    const constCurrency = 'currency-input';
    const constDescription = 'description-input';
    const constTag = 'tag-input';
    const constMethod = 'method-input';
    const method = screen.getByTestId(constMethod);
    const value = screen.getByTestId(constValue);
    const description = screen.getByTestId(constDescription);
    const tag = screen.getByTestId(constTag);
    const currency = screen.getByTestId(constCurrency);
    const button = screen.getByTestId('btn-input');

    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(value, '10');
    userEvent.type(currency, 'EUR');
    userEvent.type(description, 'descricao');
    userEvent.type(tag, 'Alimentação');
    userEvent.type(method, 'Dinheiro');
    userEvent.click(button);

    await setTimeout(1200);

    const elementDesc = screen.getByTestId('desc-el');
    const edit = screen.getByTestId('edit-btn');

    expect(elementDesc).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
    userEvent.click(edit);
    expect(edit).toBeInTheDocument();

    const btndelete = screen.getByTestId('delete-btn');
    expect(btndelete).toBeInTheDocument();
    userEvent.click(btndelete);

    await setTimeout(1200);

    expect(btndelete).not.toBeInTheDocument();

    const table = screen.getAllByRole('row');
    table.forEach((row) => {
      expect(row).toBeInTheDocument();
    });

    const element = screen.getByRole('table');
    expect(element).toBeInTheDocument();
  });
});
