import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        {expenses.length === 0 ? (
          <h2 data-testid="total-field">0.00</h2>
        ) : (
          <h2 data-testid="total-field">
            {expenses.reduce((acc, { currency, value, exchangeRates }) => (
              { ...acc, value: acc.value + value * exchangeRates[currency].ask }
            ), { value: 0, exchangeRates: {} }).value.toFixed(2)}
          </h2>
        )}
        <h2 data-testid="header-currency-field">BRL</h2>
        <h2 data-testid="email-field">{ email }</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: Proptypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
