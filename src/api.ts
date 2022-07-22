import axios from "axios";
const BASE_URL = `https://api.coinpaprika.com/v1`;
const BASE_URL1 = `https://ohlcv-api.nomadcoders.workers.dev?coinId=`;
export const fetchCoins = async () => {
  return await axios
    .get(`${BASE_URL}/coins`)
    .then((res) => res.data.slice(0, 100));
};

export const fetchCoinInfo = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/coins/${coinId}`)
    .then((res) => res?.data);
};

export const fetchCoinTickers = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res?.data);
};


export const fetchCoinHistory = async (coinId: string) => {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return await axios.get(`${BASE_URL1}${coinId}`).then((res) => res.data);
};
