const express = require('express');
const knex = require('knex');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
const database = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'Aryan@6/7/2002',
      database : 'pricetracker'
    }
  });
app.get('/', (req, res) => {
  console.log('Working fine');
  database('login').where({
    email:'abc@gmail.com'
  }).select('*').then(data => {
    console.log(data[0]);
    res.json(data[0]);
  }).catch(err => {res.status('404').json('notfound'); console.log('Pls try again => ',err)});
  database('register').insert({
    email:'xyzt@gmail.com',
    Password:'xyzt',
    name:'xyzt'
  }).then(response => {console.log(response)});
  res.send('Done the job');
});
app.post('/signup', (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  database('login').where({
    email:email
  }).select('*').then(data => {
    console.log(data[0].id);
    res.json(data[0]);
  }).catch(err => {res.json('not found'); console.log('Pls try again => ',err)});
  console.log(password,email);
})
app.post('/register',(req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  if(name === '' || email === '' || password === '') {
      res.json('Invalid input');
      return 2;
  }
  console.log(name,'=>',email,'=>',password);
  database('register').where({
    email:email,
    Password:password,
  }).then((data) => {
      if(data.length === 0){
      console.log('data ->',data);
      database('register').insert({
        email:email,
        Password:password,
        name:name
      }).then(response => {console.log('data added to register' + response)});
      database('login').insert({
        email:email,
        Password:password,
      }).then(response => {res.json('Successful')}).catch(err => console.log('error faced',err));
    }
    else{
      console.log('already exists')
      console.log(data);
      res.json('the user already exists');
    }
  })
  .catch(err => {
    console.log('error found => ', err);
  });
})
app.listen(4000);