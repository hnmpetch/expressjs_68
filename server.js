const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit')
const app = express();
const port = 3001;
const userRouter = require('./router/userRouter.js');
const productRouter = require('./router/productRouter.js');
app.use(express.json())

app.use(cors({
	origin: 'http://127.0.0.1:3000',
	credentials: true
}))


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

app.use(limiter)

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
