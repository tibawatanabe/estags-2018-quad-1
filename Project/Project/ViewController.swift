//
//  ViewController.swift
//  Project
//
//  Created by Taqtile on 04/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Foundation

class ViewController: UIViewController {
    //MARK: Properties
    @IBOutlet weak var userNameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    //MARK: Actions
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func didPressLoginButton(_ sender: UIButton) {
        let username = userNameTextField.text
        let password = passwordTextField.text
        
        if (username?.isEmpty)! || (password?.isEmpty)! {
            return
        }
        
        ExecuteLogin(username!, password!)
    }
    
    func ExecuteLogin(_ user:String,_ password:String){
        let url = URL(string: "http://www.kaleidosblog.com/tutorial/login/api/login")
        let session = URLSession.shared
        let rememberMe = false
        
        let request = NSMutableURLRequest(url: url!)
        request.httpMethod = "POST"
        
        /*
        let param = "{\"email\" : \(user), \"password\" : \(password), \"rememberMe\" : \(rememberMe)}"
        */
        
        let param = "email=" + user + "&password=" + password //+ "&rememberMe=false"
        
        request.httpBody = param.data(using: String.Encoding.utf8)
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: {
            (data, response, error) in
            
            guard let _:Data = data
            else {
                return
            }
        
        
            let json: Any?
            do
            {
                json = try JSONSerialization.jsonObject(with: data!, options: [])
            }
            catch{
                print("Erro 1")
                return
                //TODO: tratar erro de forma mais inteligente
            }
            
            guard let serverResponse = json as? NSDictionary else{
                print("Erro 2")
                return
            }
            
            if let dataBlock = serverResponse["data"] as? NSDictionary{
                if let sessionData = dataBlock["session"] as? String{
                    let preferences = UserDefaults.standard
                    preferences.set(sessionData, forKey: "session")
                    
                    DispatchQueue.main.async(
                        execute: self.LoginDone
                    )
                }
            }
        })
        
        task.resume()
        
    }
    
    func LoginDone(){
        userNameTextField.isEnabled = false
        passwordTextField.isEnabled = false
        
        print("Login realizado com sucesso")
    }

}

