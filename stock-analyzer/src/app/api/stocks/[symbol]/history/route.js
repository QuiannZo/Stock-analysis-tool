import { getStockHistory } from "../../../../../lib/yahoo";

export async function GET(request, { params }) {
  const { symbol } = params;

  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!symbol || !from || !to) {
    return new Response(JSON.stringify({ message: "Faltan parámetros requeridos: symbol, from, to." }), {
      status: 400, // Bad Request
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Usamos las fechas 'from' y 'to' recibidas del cliente para la llamada al API externa.
    const data = await getStockHistory(symbol, from, to);

    return new Response(JSON.stringify(data || []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(`Error en el API route para ${symbol}:`, error);
    return new Response(JSON.stringify({ message: "Error interno del servidor al obtener el historial." }), {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
