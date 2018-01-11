export default class User {
    id       : number;
    email    : String;
    password : String;

    constructor(id : number, email : String, password : String){
        this.id = id;
        this.email = email;
        this.password = password;
    }

    set newEmail(newMail: String){
        this.email = newMail;
    }

    set newPassword(newPass: String){
        this.password = newPass;
    }
}