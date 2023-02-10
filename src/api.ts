const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins() {
  const res = await fetch(`${BASE_URL}/coins`);
  const data = await res.json();
  return data;
}
export async function fetchCoinInfo(coinId: string) {
  const res = await fetch(`${BASE_URL}/coins/${coinId}`);
  const data = await res.json();
  return data;
}
export async function fetchCoinTickers(coinId: string) {
  const res = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const data = await res.json();
  return data;
}

export async function fetchCoinHistory(coinId: string) {
  const res = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const data = await res.json();
  console.log(data);
  return data;
}
