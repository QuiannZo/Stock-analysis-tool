import './WelcomeText.css';

export default function WelcomeText() {
  return (
    <div id="welcome">
      <div className="container">
        <div className="row">
          <div className="welcome-col">
            <h2>Welcome to the Stock Analyzer project</h2>
            <h1 className="subtitle">TEST YOUR STRATEGIES WITH HISTORICAL DATA</h1>
            <p>
              This project wants to be a platform for people interested in stock data analysis. The idea is to be able to analyze data and adapt 
              your strategies based on the returns given by our tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
