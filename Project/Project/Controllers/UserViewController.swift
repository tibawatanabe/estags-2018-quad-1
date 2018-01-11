//
//  UserViewController.swift
//  Project
//
//  Created by Taqtile on 08/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Alamofire

class UserViewController: UIViewController {
    //MARK: Properties
    var userId: Int?
    var authorizationToken: String?
    
    //MARK: Storyboard labels
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var roleLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var activeLabel: UILabel!
    @IBOutlet weak var createdAt: UILabel!
    @IBOutlet weak var updatedAt: UILabel!
    @IBOutlet weak var editButton: UIBarButtonItem!
    @IBOutlet weak var deleteButton: UIBarButtonItem!
    
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.editButton.isEnabled = false
        self.deleteButton.isEnabled = false
        self.getUserDetails()
        super.viewWillAppear(animated)
    }
    
    //MARK: Actions
    @IBAction func didPressEditButton(_ sender: UIBarButtonItem) {
        UserItems.storeObject(self.authorizationToken!, forKey: "authorizationToken")
        performSegue(withIdentifier: "fromDetailToUpdate", sender: self)
    }
    
    @IBAction func didPressDeleteButton(_ sender: UIBarButtonItem) {
        let dialogMessage = UIAlertController(title: "Confirm", message: "Are you sure you want to delete this user?", preferredStyle: .alert)
        
        let ok = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in
            self.deleteUser()
        })
        
        let cancel = UIAlertAction(title: "Cancel", style: .cancel)
        
        dialogMessage.addAction(cancel)
        dialogMessage.addAction(ok)
        
        self.present(dialogMessage, animated: true, completion: nil)
    }
    
    //MARK: Private methods
    fileprivate func getUserDetails() {
        
        guard userId != nil else {
            AlertHandler.show("Error", "Could not get user details", sender: self)
            return
        }
        
        let url = TemplateAPIHandler.userEndpoint + String(self.userId!)
        
        guard let urlComponents = URLComponents(string: url) else {
            AlertHandler.show("Error", "Unable to reach endpoint", sender: self)
            return
        }
        
        Alamofire.request(urlComponents, headers: ["Authorization": self.authorizationToken!]).responseJSON {
            response in
            if response.result.error != nil {
                AlertHandler.show("Error", "No response", sender: self)
                return
            }
            
            let user = User.userFromResponse(response)
            
            self.nameLabel.text = "Name: " + user.name
            self.roleLabel.text = "Role: " + user.role
            self.emailLabel.text = "Email: " + user.email!
            self.activeLabel.text = "Active: " + (user.active != nil ? String(describing: user.active!) : " - ")
            self.createdAt.text = "Created: " + (user.createdAt ?? " - ")
            self.updatedAt.text = "Last update: " + (user.updatedAt ?? " - ")
            
            let userInfo = [UserFields.name.rawValue: user.name, UserFields.email.rawValue: user.email, UserFields.role.rawValue: user.role]
            UserItems.storeObject(userInfo, forKey: "updatingUser")
            UserItems.storeObject(String(self.userId!), forKey: "updatingUserId")
            self.editButton.isEnabled = true
            self.deleteButton.isEnabled = true

        }
    }
    
    fileprivate func deleteUser() {
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
        
        let headerParameters = ["Authorization": token]
        
        Alamofire.request(urlComponents, method: .delete, headers: headerParameters)
            .responseJSON{ response in
            if response.result.error != nil {
                AlertHandler.show("Error", "Error on json response", sender: self)
                return
            }
            
            guard let json = response.result.value as? [String: Any] else {
                AlertHandler.show("Error", "Didn't get json dictionary", sender: self)
                return
            }
            
            guard let _ = json["data"] as? [String: Any] else {
                let errors = json["errors"] as? [[String: String]]
                if errors != nil {
                    print((errors?.first!["name"])! + (errors?.first!["message"])!)
                }
                AlertHandler.show("Error", "User could not be removed", sender: self)
                return
            }
            AlertHandler.show("Success!", "User has been removed", sender: self)
        }
    }
}

