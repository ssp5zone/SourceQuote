// This is just a temp workaround for env load in local. Fix later.
require('dotenv').config();
console.log(process.env);

// continue with main application
require('./main');