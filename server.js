
//express requirements
  const express = require('express');
  const dotEnv = require('dotenv').config(); //required to use dotenv
  const es6Renderer = require('express-es6-template-engine');
  const { append } = require('vary');
  const app = express();
  const bcrypt = require('bcrypt');
  const db = require('./models'); //This creates variable db and assigns it to the require models folder for Sequelize
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //const { DEFAULT_ECDH_CURVE } = require('tls'); This automatically added on when I installed something. Not sure why
  //const { result } = require('lodash'); This automatically added on when I installed something. Not sure why


//es6-template engine requirements
  app.engine('html', es6Renderer);
  app.set('views', 'views');
  app.set('view engine', 'html');

//setup for public folder
  app.use(express.static(__dirname + "/public"));




// TEST GET: SHOW GUESTS LIST 
//works!
app.get('/api/guests', (req, res) => {
  //console.log('Testing GET 123');
  db.guests.findAll().then((results) => {
    //console.log('Success');
    console.log(results);
    res.json(results);
  });
});



// TEST GET: GUEST MEAL CHOICE
//works w/ Postman 
app.get('/api/guest/:id', (req, res) => {
//console.log('Testing GET 123');
db.guests.findByPk(req.params.id).then((guest) => {
  if(guest) {
    db.meals.findAll({where: {guest_id: guest.id}}).then((guestMeal) => {
      //console.log(guestMeal[0].meal_choice);
      let mealName = guestMeal[0].meal_choice;  
      res.render('guest', {
        locals: {
          guestMealChoice: mealName
        }
      });  
    })
  }
})
});



//TEST GET: DISPLAY GUEST (template engine) PROFILE PAGE
//works!
app.get('/guest', (req, res) => {
    //console.log('Testing GET Display Views (Guest) Page');
    //res.render('guest');
  });




// TEST GET: enter guest page after successful login 
//Not working yet
app.post('/api/login', (req, res) => {
  //console.log('Testing GET /guest/:id');
  db.guests.findAll({where: {email:req.body.guest_email}}).then((result) => {
    console.log(result);
    res.render('guest', {
      locals: {
        guestInfo: result
      }
    });
  }) 
  //console.log(req.body);
  //res.send('');
});


app.post('/api/admin/register', (req, res) => {
  console.log(req.body);
  db.admin.findAll({where: {email: req.body.admin_email}}).then((admin) => {
    if(admin.length == 0) {
      const passwordHash = bcrypt.hashSync(req.body.password, 10);
      db.admin.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.admin_email,
        password: passwordHash
      }).then(() => {
        res.render('adminLogin');
      })
    }
  })
})


app.post('/api/admin/login', (req, res) => {
  console.log(req.body);
  db.admin.findAll({where: {email: req.body.bg_email}}).then((admin) => {
    if(admin.length > 0) {
      let selectedAdmin = admin[0]
      let adminPassword = selectedAdmin.password
      bcrypt.compare(req.body.password, adminPassword).then((result) => {
        if(result == true) {
          res.render('adminProfile', {
            locals: {
              adminName: selectedAdmin.first_name
            }
          })
        } else {
          res.json({error: 'user does not exist'});
        }
      })  
    }
  })
})



// TEST POST: Add New Guest to DB Guest Table
//works w/ Postman
app.post('/test', (req, res) => {
//console.log('Testing POST 1 2 3');
db.guests.create({
  first_name: req.body.fName,
  last_name: req.body.lName,
  email: req.body.email,
  password: req.body.password,
  relation_to_bg: req.body.relation
}).then((results) => {
  res.json(results);
})

});



//TEST POST: Guest Makes Meal choice 
//works w/ Postman
//I think it'll be like meal_choice: req.body.name_of_input.value for the "real" request)
app.post('/select', (req, res) => {
//console.log('Testing POST 1 2 3');
db.meals.create({
  meal_choice: req.body.meal,
  desert_choice: req.body.desert,
  guest_id: req.body.id,
}).then((results) => {
  res.json(results);
})

});



//POST REQUEST
app.post('/api/', (req, res) => {


});



//PUT REQUEST
app.put('/api/', (req, res) => {

});



//DELETE REQUEST
app.delete('/api/', (req, res) => {

});




//make express "listen" on port 3000 
app.listen(3000, function () {
  console.log('Currently listening on port 3000...');
})