import { Link } from 'react-router-dom'
// import data from '../data'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const result = await axios.get('/api/products')
            setProducts(result.data);
        };
        fetchdata();
    }, [])
    return (
        <div>
            <h1>Featuerd product</h1>
            <div className='products' >
                {products.map((prod) => (
                    <div className='product' key={prod.slug}>
                        <Link to={`/product/${prod.slug}`}><img src={prod.image} alt={prod.name}></img></Link>
                        <div className='product-info'>
                            <Link to={`/product/${prod.slug}`}><p>{prod.name}</p></Link>
                            <p><strong>${prod.price}</strong></p>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home