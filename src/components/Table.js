import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expDel, editFormMode } from '../redux/actions';

class Table extends Component {
  state = {
    ItenEdit: 0,
  };

  idFromItenEdit = (id) => {
    const { dispatch } = this.props;
    this.setState(
      {
        ItenEdit: id,
      },
      () => {
        const { ItenEdit } = this.state;
        dispatch(editFormMode({ payload: ItenEdit }));
      },
    );
  };

  deleteExp = ({ target }) => {
    const { dispatch } = this.props;
    const select = target.parentNode.parentNode.firstChild.innerHTML;
    dispatch(expDel(select));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{exp.description}</td>
              <td>{exp.tag}</td>
              <td>{exp.method}</td>
              <td>{(+exp.value).toFixed(2)}</td>
              <td>{exp.exchangeRates[exp.currency].name}</td>
              <td>{`R$ ${(+exp.exchangeRates[exp.currency].ask).toFixed(2)}`}</td>
              <td>
                {`R$ ${
                  (+exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)}`}
              </td>
              <td>Real</td>
              <td className="edit-delete">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.idFromItenEdit(expenses.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={ this.deleteExp }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
