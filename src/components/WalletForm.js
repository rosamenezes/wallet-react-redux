import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpenses, fetchCurrenciesThunk } from '../redux/actions';
import fetchAPI from '../services/api';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  handleChangeInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { id, value, currency, method, tag, description } = this.state;
    const { dispatch } = this.props;
    const obj = await fetchAPI();
    delete obj.USDT;
    dispatch(saveExpenses({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: obj,
    }));
    this.setState({ id: id + 1 });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        { currencies && (
          <form>
            <label htmlFor="despesa">
              Valor:
              <input
                data-testid="value-input"
                id="despesa"
                type="number"
                value={ value }
                onChange={ this.handleChangeInput }
                name="value"
              />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                data-testid="currency-input"
                id="currency"
                value={ currency }
                onChange={ this.handleChangeInput }
                name="currency"
              >
                {currencies.map((curr) => (
                  <option key={ curr } value={ curr }>{ curr }</option>
                ))}
              </select>
            </label>
            <label htmlFor="metodo">
              Método de Pagamento:
              <select
                data-testid="method-input"
                id="metodo"
                value={ method }
                onChange={ this.handleChangeInput }
                name="method"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="categoria">
              Categoria:
              <select
                data-testid="tag-input"
                id="categoria"
                value={ tag }
                onChange={ this.handleChangeInput }
                name="tag"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input
                data-testid="description-input"
                id="descricao"
                type="text"
                value={ description }
                onChange={ this.handleChangeInput }
                name="description"
              />
            </label>
            <button
              type="button"
              onClick={ this.handleSubmit }
            >
              Adicionar despesa
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
