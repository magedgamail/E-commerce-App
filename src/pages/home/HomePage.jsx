
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header.jsx';
import { ProductGrid } from './ProductGrid.jsx';
import './HomePage.css';

const RAILWAY_API_BASE_URL = 'https://ecommerce-backend-production-c5c1.up.railway.app/';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState ([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    


    useEffect(() => {
        const getHomeData = async () => {

            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(`${RAILWAY_API_BASE_URL}${urlPath}`);
            setProducts(response.data);
        } 
            

        getHomeData();
    }, [search]);



    return (
        <>
            <title>Ecommerce project</title>

            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

            <Header cart={cart} /> 

            <div className="home-page">
                <ProductGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}