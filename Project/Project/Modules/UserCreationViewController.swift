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
    fileprivate func emptyTextFields(_ fields:[String]) -> Bool {
        for field in fields {
            if field.isEmpty {
                return true
            }
        }
        return false
    }
    
    fileprivate func createUser(_ name: String, _ password: String, _ email: String, _ role: String) {
        let params = [UserFields.name.rawValue: name,
                      UserFields.password.rawValue: password,
                      UserFields.email.rawValue: email,
                      UserFields.role.rawValue: role]
        
        let createUserStream = CreateUserUseCase.init().execute(userParameters: params)
        let _ = createUserStream.subscribe({ result in
            switch result {
            case .next(let value):
                guard let _ = value.data as? UserModel else {
                    AlertHandler.show("Error", "Unable to create user", sender: self)
                    return
                }
                AlertHandler.show("Success", "User created", sender: self)
            default:
                return
            }
        })
    }
}
