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
import RxSwift

class LoginScreenViewController: UIViewController {
    //MARK: Properties
    @IBOutlet weak var userNameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var rememberMeSwitch: UISwitch!
    
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
        
        self.doLogin(username, password, rememberMe)
    }
    
    func doLogin(_ user:String,_ password:String, _ rememberMe: Bool) {
        let loginStream = LoginUseCase.init().execute(username: user, password: password, rememberMe: rememberMe)
        
        let _ = loginStream.subscribe({ result in
            switch result {
            case .next(let value):
                if !value.error {
                    self.loginSucceeded(token: value.token!)
                } else {
                    self.loginFailed()
                }
            case .error(let error):
                fatalError(error.localizedDescription)
            case .completed:
                return
            }
        })
    }
    
    func loginSucceeded(token: String) {
        print("Success!")
        UserRepository.init().saveToken(token)
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

