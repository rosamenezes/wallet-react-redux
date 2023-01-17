export const USER_EMAIL = 'USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES+FAIL';

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
