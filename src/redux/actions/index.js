export const USER_EMAIL = 'USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES+FAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXP = 'DELETE_EXP';
export const EDIT_FORM_MODE = 'EDIT_FORM_MODE';
export const SAVE_EDITED = 'SAVE_EDITED';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const fetchCurrencies = () => ({
  type: FETCH_CURRENCIES,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrenciesFail = (errorMessage) => ({
  type: FETCH_CURRENCIES_FAIL,
  errorMessage,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCurrencies());
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const currencies = await fetch(url);
    const json = await currencies.json();
    const result = Object.keys(json).filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrenciesSuccess(result));
  } catch (error) {
    dispatch(fetchCurrenciesFail(error));
  }
};

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const expDel = (expenses) => ({
  type: DELETE_EXP,
  expenses,
});

export const editFormMode = (payload) => ({
  type: EDIT_FORM_MODE,
  payload,
});

export const saveEdited = (payload) => ({
  type: SAVE_EDITED,
  payload,
});
