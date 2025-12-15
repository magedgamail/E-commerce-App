import './TrackingPage.css';
import { Header } from '../components/Header'
// NOTE: Assuming React Router v6. Use 'react-router' if you are on v5.
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {

    // orderId and productId are strings from the URL
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    const backendMainLink = 'https://ecommerce-backend-production-c5c1.up.railway.app';

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const response = await axios.get(`${backendMainLink}/api/orders/${orderId}?expand=products`)
                setOrder(response.data)
            } catch (error) {
                console.error("Failed to fetch order tracking data:", error);
                // Optionally set an error state here to show a message to the user
            }
        }

        fetchTrackingData();
    }, [orderId])

    if (!order) {
        // You might want to show a loading spinner here
        return <div>Loading Tracking Information...</div>;
    }

    // FIX: Using loose equality (==) or casting to number to prevent strict equality mismatch
    const orderProduct = order.products.find((item) => {
        return item.productId == productId // Changed variable name to 'item' for clarity, using ==
    });

    // FIX: Check if the product was found to prevent a crash
    if (!orderProduct) {
        return <div className="error-message">Error: Product tracking details not found for Order ID: {orderId} and Product ID: {productId}.</div>;
    }

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent >= 100; // Use >= 100 for safety

    return (


        <>
            <title>Tracking</title>
            {/* FIX: Changed 'to' to 'href' and ensured closing tag for link */}
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders"> {/* Added / for absolute path */}
                        View all orders
                    </Link>
                    {/* ... (rest of the JSX is the same) ... */}
                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

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