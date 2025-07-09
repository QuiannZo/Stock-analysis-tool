import "./globals.css"

import WelcomeImage from "../components/welcomeImage/welcomeImage"
import WelcomeText from "@/components/welcomeText/WelcomeText";

export default function Home() {
  return (
    <main>
      <WelcomeImage backgroundImage={"/imgs/background.jpg"} />
      <WelcomeText />
    </main>
  );
}
