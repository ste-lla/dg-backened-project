
//express requirements
const express = require('express');
require('dotenv').config(); //required to use dotenv
const es6Renderer = require('express-es6-template-engine');
const { DEFAULT_ECDH_CURVE } = require('tls');
const app = express();
const db = require('./models'); //This creates variable db and assigns it to the require models folder for Sequelize
//const { result } = require('lodash');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//es6-template engine requirements
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

//setup for public folder
app.use(express.static(__dirname + "/public"));





//GET request
app.get('/', (req, res) => {
 
})


//POST request
app.post('/api/test_users', (req, res) => {
 

})
  


//PUT request
app.put('/api/owners/:id', (req, res) => {

});


//DELETE request
app.delete('/api/owners/:id', (req, res) => {
  
})





//make express "listen" on port 3000 
app.listen(3000, function () {
    console.log('Currently listening on port 3000...');
  })