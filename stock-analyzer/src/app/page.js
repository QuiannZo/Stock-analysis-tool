import "./globals.css"

import WelcomeImage from "../components/welcomeImage/welcomeImage"
import WelcomeText from "@/components/welcomeText/WelcomeText";
import StockCarousel from "@/components/stockCarrousel/StockCarrousel";
import MainStock from "../components/mainStock/MainStock"

export default function Home() {
  return (
    <main>
      <WelcomeImage backgroundImage={"/imgs/background2.jpeg"} />
      <WelcomeText />
      <StockCarousel />
      <div className="container">
        <MainStock symbol="SPY" name="S&P 500"/>
      </div>
    </main>
  );
}
