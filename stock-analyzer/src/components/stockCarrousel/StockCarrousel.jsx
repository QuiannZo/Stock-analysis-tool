"use client";

import React from "react";
import { useRouter } from "next/navigation"; // para navegar en Next.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./StockCarrousel.css";

const fakeStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 193.12,
    image: "https://twelvedata.com/static/img/chart/AAPL.png",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 915.6,
    image: "https://twelvedata.com/static/img/chart/TSLA.png",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 351.22,
    image: "https://twelvedata.com/static/img/chart/MSFT.png",
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 130.55,
    image: "https://twelvedata.com/static/img/chart/AMZN.png",
  },
];

export default function StockSlider() {
  const router = useRouter();

  return (
    <div className="stock-slider">
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
          {fakeStocks.map((stock) => (
            <SwiperSlide key={stock.symbol}>
              <div className="card-containerRS">
                <img
                  src={stock.image}
                  alt={stock.symbol}
                  className="card-imageRS"
                />
                <h3 className="card-titleRS">{stock.name} ({stock.symbol})</h3>
                <p className="card-priceRS">${stock.price.toFixed(2)}</p>
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
