import { NavLink,useNavigate, useSearchParams } from 'react-router';
import { useState} from 'react';
import  LogoWhite  from '../assets/images/logo-white.png';
import  MobileLogoWhite  from '../assets/images/mobile-logo-white.png';
import  SearchIcon  from '../assets/images/icons/search-icon.png';
import  CartIcon  from '../assets/images/icons/cart-icon.png';
import './Header.css';

export function Header( { cart=[] } ) {
    let totalQuantity = 0;

    cart.forEach((cartItem) => {

        totalQuantity += cartItem.quantity;

    });

    const [searchParams] = useSearchParams(); 
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || '')   
    const navigate = useNavigate();

    const updateSearchInput = (event) => {

        setSearch(event.target.value);
    
    }

    const searchProduct = () => {
        navigate(`/?search=${search}`)

    }

    const pressEnter = (e) => {

        const keyPress = e.key;

        if (keyPress === 'Enter') {

            searchProduct();

        }

    }

    
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src={ LogoWhite } />
                        <img className="mobile-logo"
                            src={ MobileLogoWhite } />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" 
                    value={search} onChange={updateSearchInput}
                    onKeyDown={pressEnter}

                    />

                    <button className="search-button"
                    onClick={searchProduct}
                    >
                        <img className="search-icon" src={ SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="orders">

                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink to="/checkout" className="cart-link header-link">
                        <img className="cart-icon" src= { CartIcon } />
                        <div className="cart-quantity">{ totalQuantity }</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}