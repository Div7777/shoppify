
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
//import { ToastContainer } from 'react-toastify'; //it is used for good alert on signin
//import 'react-toastify/dist/ReactToastify.css'
import Home from './screens/Home'
import Productscreen from './screens/productscreen'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import ShippingAddress from './screens/ShippingAddress'
import PaymentScreen from './screens/paymentScreen'
import PlaceOrder from './screens/PlaceOrder'
import OrderScreen from './screens/OrderScreen'
import OrderHistory from './screens/OrderHistory'
import ProfilScreen from './screens/ProfilScreen'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute' //it is used to check if the user is  login then only the orderhistory,profile and placeorder page will shown up other wise go to login first
import DashboardScreen from './screens/DashboardScreen'
//import { Toast } from 'react-toastify/dist/components';

const App1p = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo')
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('paymentMethod')
        window.location.href = '/signin'
    }
    return (
        <BrowserRouter>
            <div className='d-flex flex-column site-container'>
                <header>
                    {/* here expand means if it is large screen then show full dispaly untill we not use toggle the navbar */}
                    <Navbar bg='dark' variant='dark' expand='lg'>
                        <Container>
                            <LinkContainer to='/'>
                                <Navbar.Brand>shoppify</Navbar.Brand>
                            </LinkContainer>
                            {/* it the the toggle for navbar in small display */}
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
                            {/* all the data of navbar show in toggle by Navbar.Collapse */}
                            {/* we rap the remain cart, and name in this  */}
                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='me-auto w-100 justify-content-end' >
                                    <Link to="/cart" className='nav-link'>
                                        Cart
                                        {cart.cartItems.length > 0 && (<Badge pill bg='danger'>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>)}
                                    </Link>
                                    {userInfo ? (
                                        <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                            <LinkContainer to="/profile" >
                                                <NavDropdown.Item>user Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orderhistory" >
                                                <NavDropdown.Item>Order History</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Divider />
                                            <Link
                                                className='dropdown-item'
                                                to='#signout'
                                                onClick={signoutHandler}>
                                                Sign Out
                                            </Link>
                                        </NavDropdown>
                                    ) : (
                                        <Link className='nav-link' to='/signin' >Sign In</Link>
                                    )}
                                    {userInfo && userInfo.isAdmin && (
                                        <NavDropdown title='Admin' id='admin-nav-dropdown'>
                                            <LinkContainer to='/admin/dashboard'>
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/admin/productlist'>
                                                <NavDropdown.Item>Products</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/admin/orderlist'>
                                                <NavDropdown.Item>Orders</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/admin/userlist'>
                                                <NavDropdown.Item>Users</NavDropdown.Item>
                                            </LinkContainer>
                                        </NavDropdown>
                                    )}

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container className='mt-3'>
                        <Routes>
                            <Route path='/product/:slug' element={<Productscreen />} />
                            <Route path='/cart' element={<CartScreen />} />
                            <Route path='/signin' element={<SigninScreen />} />
                            <Route path='/signup' element={<SignupScreen />} />
                            <Route path='/profile' element={
                                <ProtectedRoute>
                                    <ProfilScreen />
                                </ProtectedRoute>} />
                            <Route path='/placeorder' element={<PlaceOrder />} />
                            <Route path='/order/:id' element={
                                <OrderScreen>
                                    <ProfilScreen />
                                </OrderScreen>} />
                            <Route path='/orderhistory' element={
                                <OrderHistory>
                                    <ProfilScreen />
                                </OrderHistory>} />
                            <Route path='/shipping' element={<ShippingAddress />} />
                            <Route path='/payment' element={<PaymentScreen />} />
                            {/* Admin Routes */}
                            <Route path='/admin/dashboard' element={
                                <AdminRoute>
                                    <DashboardScreen />
                                </AdminRoute>
                            } />

                            <Route path='/' element={<Home />} />

                        </Routes>
                    </Container>

                </main>
                <footer>
                    <div className='text-center'>All right reserved</div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App1p
