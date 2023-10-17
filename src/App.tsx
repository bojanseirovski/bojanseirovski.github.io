import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Canvas from "./components/Canvas";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import Register from "./components/Register";
import Nav from "./components/Nav";
import './css/App.css';
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
              <Route path="/account" element={<Account />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
