import jwt from 'jsonwebtoken';
// import orderRouter from './routes/orderRoutes.js';
// it is used for user authentication by providing the token to user having secert thing
//JWT_SECRET is the method which incrept the data
export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        // it is the secret token which create when login and same token will verify when user place order
        // and check it is same user or not 
        , `${process.env.JWT_SECRET}`, {
        expiresIn: '30d',
    }
    );
};

// it is the function define for isAuth for req.user in orderRoutes for authentication
// where it will accept req,res and send the seceret token and used while response.send in orderRoutes
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decode) => {
            if (err) {
                // console.log(authorization)
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};