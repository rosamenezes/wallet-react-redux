// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETE_EXP,
  FETCH_CURRENCIES_SUCCESS,
  SAVE_EXPENSES, EDIT_FORM_MODE, SAVE_EDITED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXP:
    return { ...state,
      expenses: state.expenses
        .filter((expense) => expense.description !== action.expenses) };
  case EDIT_FORM_MODE:
    return {
      ...state,
      editor: !state.editor,
      idEdit: Object.values(action.payload).pop(),
    };
  case SAVE_EDITED:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === state.idEdit ? action.payload : expense)),
      editor: !state.editor,
    };
  default:
    return state;
  }
};

export default wallet;
