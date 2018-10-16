import * as React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Point from "./components/Point/Point";

import map from "./berlin_map.png";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Interactive Map Alert System Refurbished v2.0.4
          </h1>
        </header>
        <main className="App-main">
          <div className="App-sidebar">
            <p className="App-alerts">Alerts</p>
            <ul>
              <li>test</li>
            </ul>
          </div>
          <div className="App-content">
            <Map src={map}>
              <Point x={50} y={60} />
            </Map>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
