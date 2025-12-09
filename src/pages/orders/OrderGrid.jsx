import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react/jsx-runtime";
import BuyAgainIcon from '../../assets/images/icons/buy-again.png';
import { OrderHeader } from "./OrderHeader";


export function OrderGrid({ orders, loadCart }) {
    const backendMainLink = 'https://ecommerce-backend-production-c5c1.up.railway.app';


    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order} />

                        <div className="order-details-grid">
                            {order.products.map((orderProduct) => {

                                const addToCart = async () => {
                                    await axios.post(`${backendMainLink}/api/cart-items`, {
                                        productId: orderProduct.productId,
                                        quantity: 1
                                    })
                                    await loadCart();

                                }
                                return (
                                    <Fragment key={orderProduct.product.id}>
                                        <div className="product-image-container">
                                            <img src={orderProduct.product.image} />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                            </div>
                                            <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                                            <button className="buy-again-button button-primary">
                                                <img
                                                    className="buy-again-icon"
                                                    src={BuyAgainIcon}
                                                />
                                                <span className="buy-again-message"
                                                    onClick={addToCart}
                                                >Add to Cart</span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </a>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}