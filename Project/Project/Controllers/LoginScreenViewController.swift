//
//  ViewController.swift
//  Project
//
//  Created by Taqtile on 04/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Foundation
import Alamofire

class LoginScreenViewController: UIViewController {
    //MARK: Properties
    @IBOutlet weak var userNameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var rememberMeSwitch: UISwitch!
    var token: String?
    
    //MARK: Actions
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.clearTextFields()
    }
    
    @IBAction func didPressLoginButton(_ sender: UIButton) {
        guard let username = userNameTextField.text else {
            return
        }
        guard let password = passwordTextField.text else {
            return
        }
        let rememberMe = rememberMeSwitch.isOn
        
        doLogin(username, password, rememberMe)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "fromLoginToUserList") {
            let nextController = segue.destination as? UserListViewController
            guard token != nil else {
                return
            }
            nextController?.authorizationToken = token!
        }
    }
    
     //MARK: Login functions
    func doLogin(_ user:String,_ password:String, _ rememberMe: Bool) {
        guard let urlComponents = URLComponents(string: User.getLoginEndpoint()) else {
            fatalError("Tried to load an invalid url")
        }
        
        let loginParameters: [String: Any]? = ["email": user, "password": password, "rememberMe": rememberMe]
        
        Alamofire.request(urlComponents, method: .post, parameters: loginParameters, encoding: JSONEncoding.default).responseJSON {
            response in
            if response.result.error != nil {
                fatalError("Error on json response")
            }
            
            guard let json = response.result.value as? [String: Any] else {
                fatalError("Didn't get json dictionary")
            }
            
            guard let data = json["data"] as? [String: Any] else {
                self.loginFailed()
                return
            }
            self.token = (data["token"] as! String)
            self.loginSucceeded()
        }
    }
    
    func loginSucceeded() {
        dismiss(animated: true, completion: nil)
        performSegue(withIdentifier: "fromLoginToUserList", sender: self)
    }
    
    func loginFailed() {
        let alert = UIAlertController(title: "Error", message: "Could not login", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    func clearTextFields() {
        userNameTextField.text = ""
        passwordTextField.text = ""
    }

}

