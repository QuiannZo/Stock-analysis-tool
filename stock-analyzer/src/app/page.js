import "./globals.css"

import WelcomeImage from "../components/welcomeImage/welcomeImage"
import WelcomeText from "@/components/welcomeText/WelcomeText";
import StockCarousel from "@/components/stockCarrousel/StockCarrousel";

export default function Home() {
  return (
    <main>
      <WelcomeImage backgroundImage={"/imgs/background2.jpeg"} />
      <WelcomeText />
      <StockCarousel />
    </main>
  );
}
