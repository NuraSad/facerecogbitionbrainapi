const express = require("express");
var cors = require('cors');
const { response } = require("express");
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'dpg-cecfog9gp3jl5ttn9l00-a',
      port : 5432,
      user : 'ainursaduova',
      password : 'FIta8yzOlovsC0ub0r3vUx5rcdM07dCG',
      database : 'frbdb'
    }
  });

const register = require('./controllers/register')
const signIn = require('./controllers/SignIn')
const profile = require('./controllers/profile')
const userEntries = require('./controllers/userEntries')
const image = require('./controllers/image')

const app = express();


app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, knex, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, knex, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {profile.handleUserProfile(req, res, knex)})

app.put('/entries', (req, res)=>{userEntries.handleUserEntries(req, res, knex)})

app.post('/image', (req, res) => {image.handleClarifaiCall(req, res)})

app.listen(3000,()=> {
    console.log("app on port 3000");
})


