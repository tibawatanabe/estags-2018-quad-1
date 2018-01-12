import { Express } from 'express';
import * as express from 'express';
import bodyParser = require('body-parser');
import User from './user';
import { UserResource } from './models';
import * as pg from 'pg';
const connectionString = 'postgresql://postgres:postgres@localhost:5432/template'; //verificar connection String.

class Login {
  public express: Express;
  private userResource: UserResource;

  constructor () {
    this.express = express()
    this.userResource = new UserResource();
    this.mountRoutes()
  }

  private mountRoutes (): void {
    this.express.use(bodyParser.urlencoded({extended : true}))
    this.express.use(bodyParser.json())

    // LOGIN
    this.express.post('/user/login', async (req, res) => {
      let email: String = req.body.email;
      let password: String = req.body.password;

      let foundEmail = await this.userResource.login (email, password);
      if(foundEmail.rowCount){
        res.send("User was succesfully logged.");
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
    
    // LIST.


    this.express.get('/user', async (req, res) => {
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
        console.log("User not found..");
      }
      res.send(updatedUser);
    })
  }
}

export default new Login().express
