const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const app = express();

const { getBooks, addBook, deleteBook, getOneBook, editBook, increaseCopies, getContentLink, downloadFile} = require('./routes/books');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'baza',
    password: '1234',
    database: 'libraryDb'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(fileUpload()); // configure fileupload
app.use(cors());
// routes for the app

app.get('/getAllBooks', getBooks);
app.post('/add', addBook);
app.get('/deleteBook/:id', deleteBook);
app.get('/getBookById/:id', getOneBook);
app.post('/editBook', editBook);
app.post('/increaseCopies', increaseCopies);
app.get('/getDownloadLink/:id', getContentLink);
app.get('/download/:file(*)', downloadFile);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

