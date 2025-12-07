import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router'; // Removed
// import { Header } from '../../components/Header.jsx'; // Removed
// import { ProductGrid } from './ProductGrid.jsx'; // Removed
// import './HomePage.css'; // Removed

const RAILWAY_API_BASE_URL = 'https://ecommerce-backend-production-c5c1.up.railway.app';

export function HomePage() { // Simplified props
    // State to hold the fetched product data
    const [products, setProducts] = useState([]);
    
    // Original search logic is removed.
    // const [searchParams] = useSearchParams();
    // const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            try {
                // The URL path is hardcoded to just get all products
                const urlPath = '/api/products'; 
                
                // Construct and make the request to your Railway backend
                const response = await axios.get(`${RAILWAY_API_BASE_URL}${urlPath}`);
                
                // Set the fetched data to state
                setProducts(response.data);
                console.log('Successfully fetched products:', response.data);
                
            } catch (error) {
                console.error('Error fetching product data:', error.message);
                // Handle the error (e.g., set an error state, show a message)
            }
        }; 
            
        getHomeData();
    }, []); // Empty dependency array means this runs only once on mount

    // Return the products array or a loading message for verification
    return (
        <div>
            <h1>Product Fetch Component (Test)</h1>
            {products.length > 0 ? (
                <p>Successfully loaded **{products.length}** products from the backend.</p>
            ) : (
                <p>Loading products...</p>
            )}
        </div>
    );
}

// Note: You must ensure this modified component is used in your router/application entry point.