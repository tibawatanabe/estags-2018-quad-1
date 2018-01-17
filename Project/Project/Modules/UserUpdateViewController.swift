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
        let userInfo = UserRepository.init().retrieveUserInfo()
        
        nameTextField.text = userInfo.name
        emailTextField.text = userInfo.email
        roleTextField.text = userInfo.role
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
        let params = [UserFields.name.rawValue: name,
                      UserFields.password.rawValue: password,
                      UserFields.email.rawValue: email,
                      UserFields.role.rawValue: role]
        let userId = UserRepository.init().retriveUserId()
        
        let userUpdateStream = UserUpdateUseCase.init().execute(id: userId, userParameters: params)
        
        let _ = userUpdateStream.subscribe({ result in
            switch result {
            case .next(let value):
                guard let _ = value.data as? UserModel2 else {
                    AlertHandler.show("Error", "Unable to update user info", sender: self)
                    return
                }
                AlertHandler.show("Success", "User details updated", sender: self)
            default:
                return
            }
        })
    }
}
