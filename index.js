const app = require('./config/server');
require('dotenv').config()

const port = process.env.PORT;

app.listen(port, () => console.log(`Connected to Port ${port}`))