"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StockChart({ symbol }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandles() {
      if (!symbol) return;

      try {
        const res = await fetch(`/api/stocks/${symbol}/history`);
        const data = await res.json();
        console.log("Datos históricos Yahoo:", data);

        if (Array.isArray(data) && data.length > 0) {
          const seriesData = data.map((entry) => ({
            x: new Date(entry.date),
            y: [entry.open, entry.high, entry.low, entry.close],
          }));

          setSeries([{ data: seriesData }]);
        } else {
          console.warn("No hay datos válidos para el símbolo", symbol);
        }
      } catch (error) {
        console.error("Error al cargar velas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandles();
  }, [symbol]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: `${symbol} - Últimos 30 días`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (val) {
            return val.toFixed(2); // ✅ solo 2 decimales
        },
      }
    },
  };

  if (loading) return <p>Cargando gráfico...</p>;
  if (!series.length) return <p>No hay datos disponibles.</p>;

  return <Chart options={options} series={series} type="candlestick" height={350} />;
}
