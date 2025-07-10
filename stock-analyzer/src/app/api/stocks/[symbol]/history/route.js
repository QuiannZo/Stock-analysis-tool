import { getStockHistory } from "../../../../../lib/yahoo";

export async function GET(request, { params }) {
  const { symbol } = params;

  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(now.getDate() - 30);

  const isoNow = now.toISOString().split("T")[0];
  const isoThen = oneMonthAgo.toISOString().split("T")[0];

  const data = await getStockHistory(symbol, isoThen, isoNow);

  return Response.json(data || []);
}
