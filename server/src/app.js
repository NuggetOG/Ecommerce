const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authMiddleware = require('./Middlewares/authMiddleware');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const wishlistRoutes = require('./Routes/wishlistRoute');
const orderRoutes = require('./Routes/orderRoutes');
const paymentRoutes = require('./Routes/paymentRouter');


const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FrontendURI],
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/ping', (req,res)=>{

    res.send('pong');
});

// Public routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", authMiddleware, userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", authMiddleware, orderRoutes);
app.use("/api/v1/pay", paymentRoutes);


app.all('*', (req,res) => {
    res.status(404).send('OPPS 404, PAGE NOT FOUND');
});

module.exports = app;
