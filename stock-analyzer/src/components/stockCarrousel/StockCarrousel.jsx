"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // para navegar en Next.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./StockCarrousel.css";
import { getStockQuote } from "../../lib/finnhub";
import StockChart from "../stockChart/StockChart";

const symbols = ["AAPL", "TSLA", "MSFT", "AMZN"];

export default function StockSlider() {
  const [stocks, setStocks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPrices() {
      const results = await Promise.all(symbols.map(getStockQuote));
      const stocksWithCharts = results.map((stock) => ({
        ...stock,
        image: `https://twelvedata.com/static/img/chart/${stock.symbol}.png`,
      }));
      setStocks(stocksWithCharts);
    }

    fetchPrices();
  }, []);

  return (
    <div className="stock-sliderRS">
      <div className="container">
        <h2 className="titleRS">Acciones destacadas</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {stocks.map((stock) => (
            <SwiperSlide key={stock.symbol}>
              <div className="card-containerRS" style={{ minHeight: "400px" }}>
                {/* gráfico */}
                <StockChart symbol={stock.symbol} />
                
                <h3 className="card-titleRS">
                  {stock.symbol} – ${stock.price?.toFixed(2)}
                </h3>
                <p className="card-priceRS">
                  {stock.percent > 0 ? "+" : ""}
                  {stock.percent?.toFixed(2)}%
                </p>
                <button
                  className="card-buttonRS"
                  onClick={() => router.push(`/stocks/${stock.symbol}`)}
                >
                  Ver más
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
