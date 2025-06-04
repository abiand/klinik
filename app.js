const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
// const authroute = require('./Routes/authroute');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
//const { poolConnect } = require('./db');
const { poolPromise } = require('./Config/mydb');


const pegawaiRoutes = require('./Routes/pegawaiRoutes');
/*
(async () => {
    try {
        await poolPromise.query('SELECT 1');
        console.log('Connected to MySQL/MariaDB');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Optional: exit app if DB is critical
    }
})(); */

dotenv.config({ path: "./config.env" });
/*const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connection Successful');
}).catch(doc => {
    console.log(`Error` + doc);
})*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(upload());

app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());

app.set('layout', 'layout/layout');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));


app.use('/api', pegawaiRoutes);
app.use('/', route);

app.use((err, req, res, next) => {
    let error = { ...err }
    if (error.name === 'JsonWebTokenError') {
        err.message = "please login again";
        err.statusCode = 401;
        return res.status(401).redirect('view/login');
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'errors';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

    })
});

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));