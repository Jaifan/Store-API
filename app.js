const express = require('express');
require('express-async-errors');
const app = express();
const dbConnect = require('./db/mongoose');
const product = require('./routers/route');
const notfound = require('./middleware/notfound');
const errorHandleMiddleware = require('./middleware/errorHandle');

//middleware
app.use(express.json());

// Router
const PORT = 3000;
app.use('/api/v1/product', product);
app.use(notfound);
app.use(errorHandleMiddleware);
dbConnect();
app.listen(PORT, console.log(`Server is listening on ${PORT}...`));