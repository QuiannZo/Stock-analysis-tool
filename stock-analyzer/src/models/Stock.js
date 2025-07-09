// Stock schema.
import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  change: Number,
});

export const Stock = mongoose.models.Stock || mongoose.model("Stock", StockSchema);
