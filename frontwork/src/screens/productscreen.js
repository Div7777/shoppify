import { useParams, useNavigate } from 'react-router-dom' //fetch the data product through slug id
import axios from 'axios'
import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Helmet } from 'react-helmet-async'
import { useEffect, useReducer } from 'react'
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { Store } from '../Store'
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
const Productscreen = () => {
    const navigate = useNavigate();
    const params = useParams()
    const { slug } = params

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    })
    useEffect(() => {
        const fetchdata = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
            //setProducts(result.data);
        };
        fetchdata();
    }, [slug])
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const addToCartHandler = async () => {
        // here we check the item to is to add in cart is  already present or not if present then increase its qunatity otherwise put 1 
        const quantity = existItem ? existItem.quantity + 1 : 1;
        // we get data from fetching item by its id, and data contain all the info of that item
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            // update the dispatch function with new quantity and with the help of useContext it will send to store
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate('/cart');
    };
    return (
        loading ? (<LoadingBox />) :
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : <div>
                    <Row>
                        <Col md={6}>
                            {/* <span>{existItem.quantity}hell</span> */}
                            <img
                                className='img-large'
                                src={product.image}
                                alt={product.name}
                            ></img>
                        </Col>
                        <Col md={3}>
                            <ListGroup.Item>
                                <ListGroup.Item>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                                    <h1>{product.name}</h1>
                                </ListGroup.Item>
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}>
                                </Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>
                                description: <p>{product.description}</p>
                            </ListGroup.Item>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    {/* ListGroup make the box with borderline  */}
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>${product.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > (existItem ? existItem.quantity : 0) ?
                                                        <Badge bg='success'>In Stock</Badge>
                                                        : <Badge bg='danger'>Unavaiable</Badge>}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <div className='d-grid'>
                                                    <Button onClick={addToCartHandler} variant='primary'>
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
    )
}
export default Productscreen