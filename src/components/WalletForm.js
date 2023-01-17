import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        { currencies && (
          <form>
            <label htmlFor="despesa">
              Valor:
              <input data-testid="value-input" id="despesa" type="text" />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select
                data-testid="currency-input"
                defaultValue="USD"
                id="currency"
              >
                {currencies.map((currency) => (
                  <option key={ currency } value={ currency }>{ currency }</option>
                ))}
              </select>
            </label>
            <label htmlFor="metodo">
              Método de Pagamento:
              <select data-testid="method-input" defaultValue="Dinheiro" id="metodo">
                <option value="valor1">Dinheiro</option>
                <option value="valor2">Cartão de crédito</option>
                <option value="valor3">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="categoria">
              Categoria:
              <select data-testid="tag-input" defaultValue="Lazer" id="categoria">
                <option value="valor1">Alimentação</option>
                <option value="valor2">Lazer</option>
                <option value="valor3">Trabalho</option>
                <option value="valor4">Transporte</option>
                <option value="valor5">Saúde</option>
              </select>
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input data-testid="description-input" id="descricao" type="text" />
            </label>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
