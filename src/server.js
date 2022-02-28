const express = require('express');
require('./db/db');

const adminRouter = require('./router/adminRoutes');
const bookRouter = require('./router/bookRoutes');
const app = express();

app.use(express.json());

app.use(bookRouter);
app.use(adminRouter);

module.exports = app;