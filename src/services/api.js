const endpoint = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
};

export default fetchAPI;
