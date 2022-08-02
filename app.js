const express = require('express');
require('express-async-errors');
const app = express();
const dbConnect = require('./db/mongoose');
const product = require('./routers/route');
const notfound = require('./middleware/notfound');
const errorHandleMiddleware = require('./middleware/errorHandle');
// Security Feature
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

// Router
const PORT =  process.env.PORT || 5000;
app.use('/api/v1/product', product);
app.use(notfound);
app.use(errorHandleMiddleware);


dbConnect();
app.listen(PORT, console.log(`Server is listening on ${PORT}...`));