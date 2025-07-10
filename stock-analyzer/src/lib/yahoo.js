import yahooFinance from "yahoo-finance2";

/**
 * Obtiene velas históricas diarias para un símbolo.
 * @param {string} symbol - Ej: "AAPL"
 * @param {string} from - Fecha de inicio formato ISO: "2024-06-01"
 * @param {string} to - Fecha final formato ISO: "2024-07-01"
 */
export async function getStockHistory(symbol, from, to) {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: from,
      period2: to,
      interval: "1d",
    });

    return result; // Array de objetos
  } catch (err) {
    console.error("Error al obtener datos históricos:", err);
    return null;
  }
}
