import { Header} from '../components/Header' 
import './404error.css';


export function NotfoundPage({cart}) {


    return (
        <>
        <Header cart={cart}/>
        <div className='main'>
            <span className="error-number">404</span>
            <p className="error-pargraph">Page Not Found</p>
        </div>
            
        </>
    );
}