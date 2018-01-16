import { Express } from 'express';
import * as express from 'express';
import bodyParser = require('body-parser');
import User from './user';
import { UserResource } from './models';
import * as pg from 'pg';
import * as jwt from 'jsonwebtoken';
import { access } from 'fs';
// import * as config from'../config';
const connectionString = 'postgresql://postgres:postgres@localhost:5432/template'; //verificar connection String.

class Login {
  public express: Express;
  private userResource: UserResource;
  private secret: String = 'secret';
  constructor () {
    this.express = express()
    this.userResource = new UserResource();
    this.mountRoutes()
  }

  private verifyToken(req, res, next) {
    debugger;
    var token = req.headers['x-access-token'];
    jwt.verify(token, this.secret, function(err, result){
      if(err){
        return res.status(500).send({auth: false, message: 'failed to authenticate token'});
      }
      next();
    })
  }

  private verifyToken2 = (req, res, next) => {
    debugger;
    var token = req.headers['x-access-token'];
    jwt.verify(token, this.secret, function(err, result){
      if(err){
        return res.status(500).send({auth: false, message: 'failed to authenticate token'});
      }
      next();
    })
  }

  private mountRoutes (): void {
    this.express.use(bodyParser.urlencoded({extended : false}))
    this.express.use(bodyParser.json())

    // LOGIN
    this.express.post('/user/login', async (req, res) => {
      let email: String = req.body.email;
      let password: String = req.body.password;
      debugger;
      let foundEmail = await this.userResource.login(email, password);
      if(foundEmail.rowCount){
        console.log("User was succesfully logged.");
        let token = jwt.sign(email, 'secret');
        res.json({
          message:'Your token was generated',
          token: token
        });
      }
      else{
        res.send("The email or password are incorrect.")
      }

    })

    // CREATE
    this.express.post('/user', async (req, res) => {
      let email : String = req.body.email;
      let password : String = req.body.password;
      let user = await this.userResource.create(email, password);
    })

    // Decode
    this.express.get('/decode', (req, res) => {
      var token = req.headers['x-access-token'];

      if (!token) return res.status(401).send({ 
        auth: false, 
        message: 'No token provided.' 
      });
  
      jwt.verify(token, this.secret, function(err, decoded) {
       if (err) return res.status(500).send({ 
         auth: false, 
         message: 'Failed to authenticate token.' 
        });
         res.status(200).send(decoded);
       });
   })

  
    
    // LIST.
    this.express.get('/user', this.verifyToken2,  async (req, res) => {
    // this.express.get('/user', (req, res, next) => this.verifyToken(req, res, next),  async (req, res) => {
      debugger;
      let list = await this.userResource.list();
      let mapped = list.rows.map(el => ({
        id: el.id,
        email: el.email,
      }));

      res.send(mapped);
    })

    // GET (by id)
     this.express.get('/user/:userID', async (req, res) => {
      debugger;
      let list = await this.userResource.select(req.params.userID);
      if(!list.rowCount){
        console.log("User not found..");
      }
      res.send(list);
    })

    
    // DELETE
    this.express.delete('/user/:userID', async (req,res) => {

      let foundUser = await this.userResource.delete(req.params.userID);
      debugger;
      if(foundUser){
        console.log("User was succesfully deleted.");
      }
      else{
        console.log("User not found.");
      }
    })

    // UPDATE
    this.express.put('/user/:userID', async (req, res) => {
      let email : String = req.body.email;
      let password : String = req.body.password;
      let id: number = req.params.userID;
      let foundUser = await this.userResource.select(id);
      let updatedUser;
      if(foundUser.rowCount){
        updatedUser = await this.userResource.update(id, email, password);
      }
      else{
        console.log("User not found.");
      }
      res.send(updatedUser);
    })
  }
}

export default new Login().express
