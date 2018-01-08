//
//  ViewController.swift
//  Project
//
//  Created by Taqtile on 04/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Foundation

class LoginScreenViewController: UIViewController{
    //MARK: Properties
    @IBOutlet weak var userNameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    //MARK: Actions
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.clearTextFields()
    }
    
    @IBAction func didPressLoginButton(_ sender: UIButton) {
        let username = userNameTextField.text
        let password = passwordTextField.text
        
        if (username?.isEmpty)! || (password?.isEmpty)! {
            return
        }
        
        executeLogin(username!, password!)
    }
    //MARK: Login functions
    func executeLogin(_ user:String,_ password:String){
        let url = URL(string: "http://tq-template-node.herokuapp.com/authenticate")
        let session = URLSession.shared
        let rememberMe = false
        
        let request = NSMutableURLRequest(url: url!)
        
        
        let loginParameters: [String: Any] = ["email": user, "password": password, "rememberMe": rememberMe]
        let jsonParameters: Data
        do {
            jsonParameters = try JSONSerialization.data(withJSONObject: loginParameters, options: [])
            
            request.httpMethod = "POST"
            request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
            request.httpBody = jsonParameters
        }
        catch{
            print("Could not create json")
            print(Thread.callStackSymbols)
            return
        }
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: {
            (data, response, error) in
            guard error == nil else {
                print("error calling POST method")
                print(error!)
                return
            }
            
            guard let responseData:Data = data
            else {
                print("Could not get data")
                return
            }
        
        
            let jsonResponse: Any?
            do
            {
                jsonResponse = try JSONSerialization.jsonObject(with: responseData, options: [])
            }
            catch{
                print("Could not create json response")
                print(Thread.callStackSymbols)
                return
            }
            
            guard let serverResponse = jsonResponse as? NSDictionary else{
                print("Could not get server reponse")
                print(Thread.callStackSymbols)
                return
            }
            
            if let dataBlock = serverResponse["data"] as? NSDictionary{
                DispatchQueue.main.async(execute: self.loginSucceeded)
            }
            else{
                DispatchQueue.main.async(execute: self.loginFailed)
            }
        })
        
        task.resume()

    }
    
    func loginSucceeded(){
        dismiss(animated: true, completion: nil)
        performSegue(withIdentifier: "fromLoginToUserList", sender: self)
    }
    
    func loginFailed(){
        let alert = UIAlertController(title: "Error", message: "Could not login", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
    
    func clearTextFields(){
        userNameTextField.text = ""
        passwordTextField.text = ""
    }

}

