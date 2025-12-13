import { Link } from 'react-router';
import CheckoutIcon from '../../assets/images/icons/checkout-lock-icon.png'
import logo from '../../assets/images/logo.png'
import MobileLogo from '../../assets/images/mobile-logo.png'

import './checkoutHeader.css';

export function CheckoutHeader({cart}) {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })
    return (
        <>
                    <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src={logo} />
                            <img className="mobile-logo" src={ MobileLogo } />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{ totalQuantity } items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src={ CheckoutIcon } />
                    </div>
                </div>
            </div>
        </>
    );
}
