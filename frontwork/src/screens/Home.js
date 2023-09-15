// import data from '../data'
import axios from 'axios' // for fetch api
import logger from 'use-reducer-logger' //for detect error 
import React, { useEffect, useReducer, useState } from 'react' //hooks
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Helmet } from 'react-helmet-async' // for title of the pages
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
const Home = () => {
    //const [products, setProducts] = useState([]);
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    })
    useEffect(() => {
        const fetchdata = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
            //setProducts(result.data);
        };
        fetchdata();
    }, [])
    return (
        <div>
            <Helmet>Shoppify</Helmet>
            <h1>Featuerd product</h1>
            <div className='products' >
                {
                    loading ? (<LoadingBox />) :
                        error ? (<MessageBox variant='danger'>{error}</MessageBox>) :
                            <Row>
                                {products.map((prod) => (
                                    <Col key={prod.slug} sm={6} md={4} lg={3} className='mb-3'>
                                        <Product product={prod} />
                                    </Col>
                                ))}
                            </Row>}
            </div>
        </div>
    )
}
export default Home