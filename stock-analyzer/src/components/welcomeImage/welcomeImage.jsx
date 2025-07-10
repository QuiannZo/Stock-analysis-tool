import './welcomeImage.css';

import Link from "next/link";

export default function Welcome({ backgroundImage, opacity = 0.5 }) {
  return (
    <section id="Welcome_image">
      <div
        className="content"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay oscuro con opacidad controlada */}
        <div
          className="overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
        ></div>

        {/* contenido */}
        <div className="text-container">
          <h1>StockAnalyzer Project</h1>
          <p>Explore and analyze financial data using AI</p>
          <Link href="/stocks" passHref>
            <button className="main-btn">See Stocks</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
