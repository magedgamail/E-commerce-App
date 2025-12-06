import axios from 'axios';
import { useState, useEffect, Fragment } from 'react'
import { Header } from '../../components/Header';
import { OrderGrid } from './OrderGrid';
import './OrderPage.css'

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            let response = await axios.get('api/orders?expand=products')
            setOrders(response.data);
            
        }
        

        fetchOrdersData();

    }, [])
    return (
        <>

            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrderGrid orders={orders} loadCart={loadCart}/>
            </div>
        </>
    );
}
