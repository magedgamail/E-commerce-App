
import './TrackingPage.css';
import { Header } from '../components/Header'
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react'; 
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({cart}) {
    
    const backendMainLink = 'https://ecommerce-backend-production-c5c1.up.railway.app';

    const { orderId, productId } = useParams();
    const[order, setOrder] = useState(null);


    useEffect(() => {
        const fetchTrackingData = async () => {

            const response = await axios.get(`${backendMainLink}/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }

        fetchTrackingData();
    },[orderId])

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent =  (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent == 100;

    return (

        
        <>
            <title>Tracking</title>
            <Link rel="icon" type="image/svg+xml" to="tracking-favicon.png" />
            <Header cart={cart} />
            
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={`${backendMainLink}/${orderProduct.product.image}`} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container" style={{
                        width: `${deliveryPercent}%`
                    }}>
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}