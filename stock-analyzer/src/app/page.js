import "./globals.css"

import WelcomeImage from "../components/welcomeImage/welcomeImage"

export default function Home() {
  return (
    <WelcomeImage backgroundImage={"/imgs/background.jpg"} />
  );
}
