import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

export async function getStockQuote(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: { symbol, token: API_KEY },
    });
    return {
      symbol,
      price: response.data.c,
      change: response.data.d,
      percent: response.data.dp,
    };
  } catch (error) {
    console.error("Error al obtener precio de", symbol, error);
    return null;
  }
}
