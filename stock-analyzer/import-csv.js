// import-csv.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Stock } from "./src/models/Stock.js";

// Cargar .env
dotenv.config();

// URL del MongoDB local
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI no está definido en el .env");
  process.exit(1);
}

// Nombre del archivo CSV y el símbolo
const FILE_PATH = "./data/brkb.csv";
const SYMBOL = "BRKB";

async function run() {
  // Conectarse a la db
  await mongoose.connect(MONGODB_URI);
  console.log("Conectado a MongoDB");

  const records = [];

  fs.createReadStream(FILE_PATH)
    .pipe(csv()).on("data", (row) => {
      // Convertir campos
      const stock = {
        symbol: SYMBOL,
        date: new Date(row["Date"]),
        open: parseFloat(row["Open"]),
        high: parseFloat(row["High"]),
        low: parseFloat(row["Low"]),
        close: parseFloat(row["Close"]),
        volume: parseInt(row["Volume"]),
        change: row["Change %"] ? parseFloat(row["Change %"]) : null,
      };
      records.push(stock);
    })
    .on("end", async () => {
      await Stock.insertMany(records);
      console.log(`Insertados ${records.length} registros de ${SYMBOL}`);
      mongoose.disconnect();
    });
}

run().catch((err) => {
  console.error("Error:", err);
});
