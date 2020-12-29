const express = require('express');
const connectDB = require('./config/db');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

connectDB();
app.get('/', (req, res) => {
  res.send('API RUNNING');
});

// Init middleware
app.use(express.json({extended:false}));/*as express has body-parser module builtin */

// Define routes

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
