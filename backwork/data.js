import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'divesh',
            email: 'div@gmail.com',
            // for incrept the password use this
            password: bcrypt.hashSync('1234'),
            isAdmin: true,
        },
        {
            name: 'deepak',
            email: 'deep@gmail.com',
            password: bcrypt.hashSync('12345'),
            isAdmin: false

        }
    ],
    products: [
        {
            // _id: '1',
            name: 'Nikie shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/ak.jpg',
            price: 120,
            countInStock: '10',
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'good shirt'
        },
        {
            // _id: '2',
            name: 'adidas shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirts',
            image: '/images/div.jpg',
            price: 120,
            countInStock: '10',
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'good shirt'
        },
        {
            // _id: '3',
            name: 'puma shirt',
            slug: 'puma-slim-shirt',
            category: 'Shirts',
            image: '/images/mia.jpg',
            price: 120,
            countInStock: '10',
            brand: 'puma',
            rating: 4.5,
            numReviews: 10,
            description: 'good shirt'
        },
        {
            // _id: '4',
            name: 'Campus shirt',
            slug: 'Campus-slim-shirt',
            category: 'Shirts',
            image: '/images/prat.jpg',
            price: 120,
            countInStock: '10',
            brand: 'Campus',
            rating: 4.5,
            numReviews: 10,
            description: 'good shirt'
        }
    ]
}
export default data;