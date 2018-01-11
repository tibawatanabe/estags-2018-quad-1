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
    
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.editButton.isEnabled = false
        self.getUserDetails()
        super.viewWillAppear(animated)
    }
    
    //MARK: Actions
    @IBAction func didPressEditButton(_ sender: UIBarButtonItem) {
        UserItems.storeObject(self.authorizationToken!, forKey: "authorizationToken")
        performSegue(withIdentifier: "fromDetailToUpdate", sender: self)
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
        }
    }
}

