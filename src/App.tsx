import React, {useState  } from "react";
import Canvas from "./components/Canvas";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(100);
  const [colorImage, setImage] = useState('/chibi-mario.svg');

  return (
    <div className="App">
        <h1 className="multicolortext">Coloring Book</h1>
        <div className="draw-area-background">
          <div className="draw-area">
              <Canvas
                  lineOpacity={lineOpacity}
                  lineColor={lineColor}
                  lineWidth={lineWidth}
                  imageUri={colorImage}
                  setLineColor={setLineColor}
                  setLineWidth={setLineWidth}
                  setLineOpacity={setLineOpacity}
                  setImage = {setImage}
                  width={900}
                  height={550}
              />
          </div>
        </div>
    </div>
  );
}

export default App;
