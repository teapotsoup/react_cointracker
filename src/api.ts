import axios from "axios";
const BASE_URL = `https://api.coinpaprika.com/v1`;

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

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
