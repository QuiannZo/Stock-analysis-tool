"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getStockHistory } from "@/lib/yahoo";
import "./MainStock.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FeaturedStock({ symbol, name }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
    async function fetchStockHistory() {
        // La fecha de fin sigue siendo la misma
        const to = new Date();
        to.setHours(to.getHours() - 1);
        const toISO = to.toISOString().split("T")[0];

        // Cambia el cálculo de la fecha de inicio para que reste un año
        const from = new Date(to);
        from.setFullYear(from.getFullYear() - 1); // <-- Este es el cambio
        const fromISO = from.toISOString().split("T")[0];

        try {
        const res = await fetch(`/api/stocks/${symbol}/history?from=${fromISO}&to=${toISO}`);
        const data = await res.json();

        if (!data || data.error || data.length === 0) {
            console.warn("No se encontraron datos para", symbol, "Error:", data.error);
            setSeries([]);
            setLoading(false);
            return;
        }

        const seriesData = data.map((entry) => ({
            x: new Date(entry.date),
            y: [entry.open, entry.high, entry.low, entry.close],
        }));

        setSeries([{ data: seriesData }]);
        } catch (error) {
        console.error("Error al obtener datos históricos:", error);
        setSeries([]);
        } finally {
        setLoading(false);
        }
    }

    if (symbol) {
        fetchStockHistory();
    }
    }, [symbol]);

  const options = {
    chart: { type: "candlestick", height: 400 },
    title: { text: "", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (val) => val.toFixed(2),
      },
    },
  };

  if (loading) return <p>Cargando gráfico de {symbol}...</p>;

  return (
    <div className="featured-stock-container">
      <div className="stock-header">
        <h2 className="stock-title">
          {name} ({symbol})
        </h2>
        <button
          className="view-more-btn"
          onClick={() => router.push(`/stocks/${symbol}`)}
        >
          Ver más
        </button>
      </div>

      <div className="stock-chart">
        <Chart options={options} series={series} type="candlestick" height={400} />
      </div>
    </div>
  );
}
