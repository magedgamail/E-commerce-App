import axios from 'axios'
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotfoundPage } from "./pages/NotfoundPage";
import "./App.css";

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);
  const backendMainLink = 'https://ecommerce-backend-production-c5c1.up.railway.app';

  const loadCart = async () => {
      const response = await axios.get(`${backendMainLink}/api/cart-items?expand=product`)
        setCart(response.data);
    };

  useEffect(() => {

    loadCart();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />}></Route>
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage  cart={cart} loadCart={loadCart}/>} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
      <Route path="*" element={<NotfoundPage cart={cart}/>} />
    </Routes>
  );
}

export default App;
