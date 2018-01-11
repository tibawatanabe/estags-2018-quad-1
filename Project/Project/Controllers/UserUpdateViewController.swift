//
//  UserUpdateViewController.swift
//  Project
//
//  Created by Taqtile on 11/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Alamofire

class UserUpdateViewController: UIViewController {
    //MARK: Storyboard items
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var roleTextField: UITextField!
    
    //MARK: UIVIewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.fillTextFields()
    }
    
    //MARK: Actions
    @IBAction func didPressUpdateButton(_ sender: UIButton) {
        let name = nameTextField.text ?? ""
        let password = passwordTextField.text ?? ""
        let email = emailTextField.text ?? ""
        let role = roleTextField.text ?? ""
        
        if emptyTextFields([name, password, email, role]) {
            AlertHandler.show("Error" ,"Missing one or more fields", sender: self)
        }
        
        self.updateUser(name, password, email, role)
    }
    
    //MARK: Private methods
    fileprivate func fillTextFields() {
        guard let userInfo = UserItems.getObject(forKey: "updatingUser") as? [String: String] else {
            AlertHandler.show("Error", "Unable to retrieve user information", sender: self)
            return
        }
        
        nameTextField.text = userInfo[UserFields.name.rawValue]
        emailTextField.text = userInfo[UserFields.email.rawValue]
        roleTextField.text = userInfo[UserFields.role.rawValue]
    }
    
    func emptyTextFields(_ fields:[String]) -> Bool {
        for field in fields {
            if field.isEmpty {
                return true
            }
        }
        return false
    }
    
    func updateUser(_ name: String, _ password: String, _ email: String, _ role: String) {
        guard let userId = UserItems.getObject(forKey: "updatingUserId") as? String else {
            AlertHandler.show("Error", "Unable to recover user id", sender: self)
            return
        }
        
        let url = TemplateAPIHandler.userEndpoint + userId
        
        guard let urlComponents = URLComponents(string: url) else {
            AlertHandler.show("Error", "Invalid url", sender: self)
            return
        }
        
        guard let token = UserItems.getObject(forKey: "authorizationToken") as? String else {
            AlertHandler.show("Error", "Unable to recover authorization token", sender: self)
            return
        }
        
        let userParameters = [UserFields.name.rawValue: name, UserFields.password.rawValue: password, UserFields.email.rawValue: email, UserFields.role.rawValue: role]
        
        let headerParameters = ["Authorization": token]
        
        Alamofire.request(urlComponents, method: .put, parameters: userParameters, encoding: JSONEncoding.default, headers: headerParameters).responseJSON{ response in
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
                AlertHandler.show("Error", "User details could not be changed", sender: self)
                return
            }
            
            AlertHandler.show("Success!", "User details updated", sender: self)
            
        }
    }
}
