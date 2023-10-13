import React, {useState} from "react";
import Canvas from "./components/Canvas";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(100);

  return (
    <div className="App">
        <header>
          <h1 className="multicolortext">Coloring Book</h1>
        </header>
        <div className="draw-area-background">
          <div className="draw-area">
              <Canvas
                  lineOpacity={lineOpacity}
                  lineColor={lineColor}
                  lineWidth={lineWidth}
                  setLineColor={setLineColor}
                  setLineWidth={setLineWidth}
                  setLineOpacity={setLineOpacity}
              />
          </div>
        </div>
        <footer>
            <a href="https://bojanseirovski.github.io/">https://bojanseirovski.github.io/</a>
        </footer>
    </div>
  );
}

export default App;
