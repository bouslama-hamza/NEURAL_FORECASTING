// require apps
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// root
const index = require('./route/index');

// set up
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/static`));

// middleware
app.use(express.static('public'));

// routes
app.use('/', index);

// listen 
app.listen(port, function() {
    console.log('http://localhost:' + port + '');
});