import {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Canvas from "./components/Canvas";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Nav from "./components/Nav";
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
  const [lineWidth, setLineWidth] = useState(20);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(100);

  return (
    <div className="App">
        <header>
          <h1 className="multicolortext">Doodles</h1>
        </header>
        <Nav/>
        <div className="draw-area-background">
          <div className="draw-area">
            <Routes>
              <Route path="/" element={<Canvas
                  lineOpacity={lineOpacity}
                  lineColor={lineColor}
                  lineWidth={lineWidth}
                  setLineColor={setLineColor}
                  setLineWidth={setLineWidth}
                  setLineOpacity={setLineOpacity}
              />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <footer>
                <a href="https://bojanseirovski.github.io/">https://bojanseirovski.github.io/</a>
            </footer>
          </div>
        </div>
    </div>
  );
}

