
//express requirements
  const express = require('express');
  const dotEnv = require('dotenv').config(); //required to use dotenv
  const es6Renderer = require('express-es6-template-engine');;
  const app = express();
  const bcrypt = require('bcrypt');
  const db = require('./models'); //This creates db variable to do database queries w/ sequelize

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //const { DEFAULT_ECDH_CURVE } = require('tls'); Automatically added itself when I installed something. Not sure why
  //const { result } = require('lodash'); Automatically added itself when I installed something. Not sure why
  //const { append } = require('vary'); Automatically added itself at some point. Not sure why


//es6-template engine requirements
  app.engine('html', es6Renderer);
  app.set('views', 'views');
  app.set('view engine', 'html');

//setup for public folder
  app.use(express.static(__dirname + "/public"));




//            *********   ADMIN    ***********


//POST: FOR ADMIN TO CREATE AN ACCOUNT
app.post('/api/admin/login', (req, res) => {
  console.log(req.body);
  db.admins.findAll({where: {email: req.body.admin_email}}).then((admin) => {
    if(admin.length == 0) {
      const passwordHash = bcrypt.hashSync(req.body.password, 10);
      db.admins.create({
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



//POST: FOR ADMIN TO LOGIN (Right After Creating a Profile)
app.post('/api/admin/login/profile', (req, res) => {
  console.log(req.body);
  db.admins.findAll({where: {email: req.body.bg_email}}).then((admin) => {
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



//POST: FOR ADMIN TO LOGIN FROM HOME PAGE
app.post('/api/admin/profile/:id', (req, res) => {
  //console.log(req.body.bg_email);
  
  db.admins.findAll({where: {email: req.body.bg_email}}).then((admin) => {
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
          //alert('Wrong email or password entered. Please try again.')
          //res.json({error: 'user does not exist'});
        }
      })  
    }

  })

})


//MANUALLY ACCESS ADMIN PROFILE PAGE BY ENTERING ID IN BROWSER
app.get('/api/admin/profile/:id', (req, res) => {
  //console.log('Testing GET /guest/:id');
  db.admins.findAll({where: {id:req.params.id}}).then((admin) => {
    //console.log(req.params.id);
    let selectedAdmin = admin[0]
    res.render('adminProfile', {
      locals: {
        adminName: selectedAdmin.first_name
      }
    })
  })
});



//POST: ADMIN ADD GUESTS TO GUEST LIST (guests table)
app.post('/api/admin/profile/:id/addedGuest', (req, res) => {
  //console.log(req.body.guestFName);
  db.guests.create({first_name: req.body.guestFName, last_name: req.body.guestLName, email: req.body.guestEmail, admin_id: 19}).then((newGuest) => {
    console.log(newGuest);
    res.render('adminSubmit');
      //how to get it to stay on same page after submit
      //make sure when it does stay on same page, you can submit multiple times w/ refreshing
  })
});




//POST: ADMIN ADD ENTREES AND DESSERTS (meals table)
app.post('/api/admin/profile/:id/submittedFood', (req, res) => {
  //console.log(req.body.addEntree1);
  
  db.meals.create({
    entree_1: req.body.addEntree1, 
    entree_2: req.body.addEntree2, 
    entree_3: req.body.addEntree3,
    entree_4: req.body.addEntree4,
    desert_1: req.body.addDesert1, 
    desert_2: req.body.addDesert2,
    admin_id: 19}).then((food) => {
      //console.log(food);
      res.render('adminSubmit');
        //how to create multiple guest entries for gift_name column?
        //this only adds the 2nd entree and 2nd desert to pgAdmin. Maybe just have 1 text input for entree and 1 for desert?
        //how to get it to stay on same page after submit. Show submit successful msg and make it disappear after few sec
        //make sure when it does stay on same page, you can submit multiple times w/ refreshing
  })
});




//POST: FOR ADMIN TO ADD GIFTS TO THE REGISTRY (gift_registry table)
app.post('/api/admin/profile/:id/submittedGifts', (req, res) => {
  //console.log(req.body.addGift1);
  db.gift_registry.create({
    gift1: req.body.addGift1, 
    gift2: req.body.addGift2, 
    gift3: req.body.addGift3, 
    gift4: req.body.addGift4, 
    gift5: req.body.addGift5, 
    gift6: req.body.addGift6, 
    admin_id: 19}).then((newGift) => {
    //console.log(newGift);
    res.render('adminSubmit');
      //how to create multiple guest entries for gift_name column?
      //how to get it to stay on same page after submit
      //make sure when it does stay on same page, you can submit multiple times w/ refreshing
  })
});




//GET: ADMIN CLICKS TO VIEW "GUESTS ATTENDING" LIST  
app.get('/api/admin/profile/:id/guestAttending', (req, res) => {
  db.guests.findAll({where: {cancelled_rsvp: null}}).then((attendingList) => {
    //console.log(guestsAttending);
    //console.log(attendingList[2].first_name);
    res.render('guestsAttending', {
      locals: {
        guestsAttending: attendingList
      }
    });
  }) 
}); 



//GET: ALLOW ADMIN TO MODIFY A GUEST FROM "GUEST ATTENDING" LIST
app.get('/api/admin/profile/:id/guestAttending/modify/:guestId', (req, res) => {
  //console.log('TESTING UPDATE GUEST 1 2 3');
  res.render('updateGuest');
}); 

app.post('/api/admin/profile/:id/guestAttending/modify/:guestId/submitted', (req, res) => {
  console.log('TESTING SUBMIT');
  db.guests.update({ first_name: req.body.guestFName, last_name: req.body.guestLName, email: req.body.guestEmail}, {where: {id: 27}}).then((result) => {
    console.log(result);
    res.render('adminSubmit');
  });
});




//GET: ADMIN CLICKS TO GET "GUESTS *NOT* ATTENDING" LIST  
app.get('/api/admin/profile/:id/guestNotAttending', (req, res) => {
  db.guests.findAll({where: {cancelled_rsvp: true}}).then((attendingList) => {
    //console.log(guestsAttending);
    //console.log(attendingList[2].first_name);
    res.render('guestsNotAttending', {
      locals: {
        guestsNotAttending: attendingList
      }
    });
  }) 
}); 




//GET: ADMIN CAN VIEW LIST OF GIFTS IN REGISTRY 
/* app.get('/api/admin/profile/:id/deleteGift', (req, res) => {
  db.gift_registry.findAll({where: {admin_id: 15, selected_by_guest: null}}).then((gifts) => {
    //console.log(gifts[0]);
    //console.log(gifts[0].gift1);
    //res.json({});
    res.render('deleteGift', {
      locals: {
        gift1: gifts[0].gift1,
        gift2: gifts[0].gift2,
        gift3: gifts[0].gift3,
        gift4: gifts[0].gift4,
        gift5: gifts[0].gift5,
        gift6: gifts[0].gift6,
      }
    });
  }) 
});  */



//ATTEMPTING TO ADD id param to req.id object (middleware)
//Not working

/* app.param('id', function (req, res, next, id) {
  let guestId = guests.find(
      (user) => {
          return user.id == id;
      }
  );
  if (!guestId) {
      next(new Error('failed to load user'));
  } else {
      req.id = guestId;
      next();
  }
}); */

/* app.param('id', function(req, res, next, id) {
  //get the guest details from the guests model and attach it to the request object
  db.guests.findAll({where: {email:req.body.guest_email}}).then((guest) => {
    //console.log(guest[0].id);
    if(guest.length > 0) {
        req.id = guest[0].id;
        //console.log(req.id);
        next();
    }
  }) 
}); */






//            *********   GUESTS    ***********

//MANUALLY ACCESS GUEST PROFILE PAGE BY ENTERING ID IN BROWSER
app.get('/api/guest/profile/:id', (req, res) => {
  //console.log('Testing GET /guest/:id');
  db.guests.findAll({where: {id:req.params.id}}).then((guest) => {
    //console.log(req.params.id);
    res.render('guest', {
      locals: {
        guestInfo: guest, //guestInfo is the key. Can name key in any way that makes sense. guest is the value of that key. In this case, guest is really the object returned w/ info about the guest after we db.findAll() w/ matching email
        guestId: guest[0].id
      }
    });
  })
});



//GUEST LOGIN FROM HOME PAGE 
app.post('/api/guest/profile/:id', (req, res) => {
  //console.log('Testing GET /guest/:id');
  db.guests.findAll({where: {email:req.body.guest_email}}).then((guest) => {
    //console.log(guest[0].id);
    //req.params.id = req.id.toString();
    //req.params.id = guest[0].id;
    res.render('guest', {
      locals: {
        guestInfo: guest,
        guestId: guest[0].id
      }
    });
  }) 
});


//POST: FOR GUEST TO MAKE THEIR SELECTIONS (ENTREE, DESERT & GIFT)
app.post('/api/guest/profile/:id/submitted', (req, res) => {
 /*  db.guests.findAll({where: {id: 1}}).then((guest) => {
    //console.log(guest);
  }) */
  db.guests.update({ entree_choice: req.body.entree, desert_choice: req.body.desert, gift_choice: req.body.gift}, {where: {id: 27}}).then((result) => {
    console.log(result);
    res.render('guestSubmit');
  });
});



//POST: FOR GUEST TO CANCEL RSVP
app.post('/api/guest/profile/:id/cancelledRSVP', (req, res) => {
  db.guests.update({ cancelled_rsvp: true}, {where: {id: 27}}).then((result) => {
    console.log(result);
    res.render('guestCancel');
  });
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




//MAKES EXPRESS "LISTEN" ON PORT 3000
app.listen(3000, function () {
  console.log('Currently listening on port 3000...');
})