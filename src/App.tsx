import React, {useState} from "react";
import Canvas from "./components/Canvas";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(100);

  // var cWidth = window.innerWidth*0.55;
  // var cHeight =  window.innerHeight*0.5;

  return (
    <div className="App">
        <h1 className="multicolortext">Coloring Book</h1>
        <div className="draw-area-background">
          <div className="draw-area">
              <Canvas
                  lineOpacity={lineOpacity}
                  lineColor={lineColor}
                  lineWidth={lineWidth}
                  setLineColor={setLineColor}
                  setLineWidth={setLineWidth}
                  setLineOpacity={setLineOpacity}
                  // width={cWidth}
                  // height={cHeight}
              />
          </div>
        </div>
    </div>
  );
}

export default App;
