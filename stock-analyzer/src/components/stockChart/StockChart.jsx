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

      // 1. Calcular el rango de fechas para el último mes
      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 1); // ✅ Resta un mes

      // Convertir a formato YYYY-MM-DD
      const toISO = toDate.toISOString().split("T")[0];
      const fromISO = fromDate.toISOString().split("T")[0];

      try {
        // Incluir las fechas en la URL de la petición
        const res = await fetch(
          `/api/stocks/${symbol}/history?from=${fromISO}&to=${toISO}`
        );
        const data = await res.json();

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
        show: false,
      },
      zoom: {
        enabled: false, 
      },
    },
    title: {
      text: ``,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Ocultar etiquetas del eje X
      },
      axisBorder: {
        show: false, // Ocultar borde del eje X
      },
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
    show: true,
    tooltip: {
        enabled: true,
    },
    labels: {
        formatter: function (val) {
        return val.toFixed(2); // formatea el número a 2 decimales
        }
    }
    },
    grid: {
      show: true, // cuadrícula de fondo
    }
  };

  if (loading) return <div style={{height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><p>Cargando...</p></div>;
  if (!series.length) return <div style={{height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><p>Sin datos.</p></div>;

  return <Chart options={options} series={series} type="candlestick" height={350} />;
}