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

  private pj: User = new User(1, 'pj@taqtile.com', '1234');
  private jp: User = new User(2, 'jp@taqtile.com', '4321');
  private test: User = new User(3,'test@gmail.com', 'xxxxx');
  
  public userList: Array<User> = [this.pj, this.jp, this.test];

  private mountRoutes (): void {
    this.express.use(bodyParser.urlencoded({extended : true}))
    this.express.use(bodyParser.json())

    // CREATE
    this.express.post('/user', async (req, res) => {
      var email : String = req.body.email;
      var password : String = req.body.password;

      let user = await this.userResource.create(email, password);
      // var newUser : User = new User(this.userList.length+1, email, password);
      // this.userList.push(newUser);
      // console.log("E-masil = "+email+", password is "+password);
      // res.end(console.log(this.userList));
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
      // res.end(console.log(this.userList));
    })

    // GET (by id)
     this.express.get('/user/:userID', async (req, res) => {
      debugger;
      let list = await this.userResource.select(req.params.userID);
      res.send(list);
      // res.end(console.log(this.userList[req.params.userID-1]));
    })

    
    // DELETE
    this.express.delete('/user/:userID', async (req,res) => {

      let foundUser = await this.userResource.delete(req.params.userID);
      debugger;
      if(foundUser){
        console.log("usuário deletado com sucesso");
      }
      else{
        console.log("usuário não encontrado");
      }
      // let foundUser = this.userList.find(user => user.id === +req.params.userID);

      // if (foundUser) {
      //   //
      //   var index : number = this.userList.indexOf(foundUser);
      //   this.userList.splice(index, 1);
      // }
      // res.end(console.log(this.userList));
    })

    // UPDATE
    this.express.put('/user/:userID', (req, res) => {
      let foundUser = this.userList.find(user => user.id === +req.params.userID);

      if (foundUser) {
        var index : number = this.userList.indexOf(foundUser);
        this.userList[index].newEmail = 'changed';
        this.userList[index].newPassword = 'thisChangedToo';
      }
      res.end(console.log(this.userList));
    })
  }
}

export default new Login().express
