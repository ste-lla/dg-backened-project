
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



//TESTING OUT GET POST PUT DELETE REQUESTS
var owners = [
  {
    id: 1,
    name: "Adam",
    pets: [
      {
        id: 1,
        name: "Vera",
        type: "Dog"
      },
      {
        id: 2,
        name: "Felix",
        type: "Cat"
      }
    ]
  },
  {
    id: 2,
    name: "Kamilah",
    pets: [
      {
        id: 1,
        name: "Doug",
        type: "Dog"
      }
    ]
  }
];

let currentId = 3;



//GET request
app.get('/', (req, res) => {
  console.log('Testing GET 1 2 3');
  res.send('Wedding Registry');
})


//POST request
app.post('/api/test_users', (req, res) => {
  //console.log('Testing POST 1 2 3');

  db.test1.create({
    name: 'Test_3',
    email: 'test3@gmail.com',
    password: 'test3pw'
  }).then(user => {
    console.log(user);
  });
  
  res.json({});
})
  


//PUT request
app.put('/api/owners/:id', (req, res) => {
  console.log('Testing PUT 1 2 3');
  console.log(owners[1].id); //A number
  console.log(req.params.id); //A string

  owners[1].name = req.body.name;

  res.json(owners[1]);
});


//DELETE request
app.delete('/api/owners/:id', (req, res) => {
  console.log('Testing DELETE 1 2 3');

  let updatedOwners = owners.filter(owner => owner.id !== parseInt(req.params.id));

  res.json(updatedOwners);
})







//make express "listen" on port 3000 
app.listen(3000, function () {
    console.log('Currently listening on port 3000...');
  })