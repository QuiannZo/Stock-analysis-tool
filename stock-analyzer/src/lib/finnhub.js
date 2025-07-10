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

// Necesita tener premium.
export async function getStockCandles(symbol, resolution = "D", from, to) {
  try {
    const response = await axios.get(`${BASE_URL}/stock/candle`, {
      params: { symbol, resolution, from, to, token: API_KEY },
    });
    return response.data; // contains the arrays de c, o, h, l, t, v.
  } catch (error) {
    console.error("Error al obtener velas de", symbol, error);
    return null;
  }
}
