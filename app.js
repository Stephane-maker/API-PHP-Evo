const express = require("express");
const mysql = require("mysql");
const routeUser = require("./route/user");
const routeApp = require("./route/app");

const app = express();


app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '753159852456',
    database: 'my_app',
})
connection.connect();
   
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api', routeUser);
app.use('/api', routeApp);

module.exports = app;
