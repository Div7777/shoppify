
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Productscreen from './screens/productscreen'
const App1p = () => {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <Link to='/'>shoppify</Link>
                </header>
                <main>
                    <Routes>
                        <Route path='/product/:slug' element={<Productscreen />} />
                        <Route path='/' element={<Home />} />
                    </Routes>

                </main>
            </div>
        </BrowserRouter>
    )
}

export default App1p
