import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from "../../Utils/Money"

export function PaymentSummery({ paymentSummery, loadCart}) {
    
    const navigate= useNavigate();
    
    const createOrder = async () => {
        await axios.post('/api/orders');
        await loadCart();
        navigate('/orders')
    };
    return (
        <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        {paymentSummery && (
                            <>
                                <div className="payment-summary-row"
                                data-testid="payment-summary-product-cost"
                                >
                                    <div>Items ({paymentSummery.totalItems}):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummery.productCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row"
                                data-testid="payment-summary-shipping-cost">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummery.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row"
                                data-testid="payment-summary-total-before-tax"
                                >
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummery.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row"
                                data-testid="payment-summary-tax"
                                >
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummery.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row"
                                data-testid="payment-summary-total"
                                >
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummery.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary"
                                data-testid="place-order-button"
                                onClick={createOrder}
                                >
                                    Place your order
                                </button>
                            </>
                        )}

                    </div>
    )
}