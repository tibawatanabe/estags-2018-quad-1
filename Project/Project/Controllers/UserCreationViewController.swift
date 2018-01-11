//
//  UserCreationViewController.swift
//  Project
//
//  Created by Taqtile on 10/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Alamofire

class UserCreationViewController: UIViewController {
    //MARK: Properties
    var authorizationToken: String?
    
    //MARK: Storyboard items
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var roleTextField: UITextField!
    @IBOutlet weak var createButton: UIButton!
    
    //MARK: UIViewController methods
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    //MARK: Actions
    @IBAction func didPressCreateButton(_ sender: Any) {
//        createButton.isEnabled = false
        
        let name = nameTextField.text ?? ""
        let password = passwordTextField.text ?? ""
        let email = emailTextField.text ?? ""
        let role = roleTextField.text ?? ""
        
        if emptyTextFields([name, password, email, role]) {
            AlertHandler.show("Error" ,"Missing one or more fields", sender: self)
        }
        
        self.createUser(name, password, email, role)
    }
    
    //MARK: Private methods
    func emptyTextFields(_ fields:[String]) -> Bool {
        for field in fields {
            if field.isEmpty {
                return true
            }
        }
        return false
    }
    
    func createUser(_ name: String, _ password: String, _ email: String, _ role: String){
        guard let urlComponents = URLComponents(string: TemplateAPIHandler.userEndpoint) else {
            fatalError("Tried to load an invalid url")
        }
        
        let userParameters = [UserFields.name.rawValue: name, UserFields.password.rawValue: password, UserFields.email.rawValue: email, UserFields.role.rawValue: role]
        
        Alamofire.request(urlComponents, method: .post, parameters: userParameters, encoding: JSONEncoding.default, headers: ["Authorization": self.authorizationToken!]).responseJSON{ response in
            if response.result.error != nil {
                fatalError("Error on json response")
            }
            
            guard let json = response.result.value as? [String: Any] else {
                fatalError("Didn't get json dictionary")
            }
            
            guard let _ = json["data"] as? [String: Any] else {
                let errors = json["errors"] as? [[String: String]]
                if errors != nil {
                    print((errors?.first!["name"])! + (errors?.first!["original"])!)
                }
                AlertHandler.show("Error", "User could not be created", sender: self)
                return
            }
            
            AlertHandler.show("Success!", "User created", sender: self)
        }
        
    }
}
