import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Order from "./pages/Order";
import Menu from "./pages/Menu";

export default function Home(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<App />} />
          <Route path="/app" element={<App />} />
          <Route path="order" element={<Order />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();