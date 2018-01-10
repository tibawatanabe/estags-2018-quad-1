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
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.getUserDetails()
        super.viewWillAppear(animated)
    }
    
    //MARK: Private methods
    fileprivate func getUserDetails() {
        
        guard userId != nil else {
            fatalError("Empty id")
        }
        
        let url = User.getUserEndpoint() + String(self.userId!)
        
        guard let urlComponents = URLComponents(string: url) else {
            fatalError("Tried to load an invalid url")
        }
        
        Alamofire.request(urlComponents, headers: ["Authorization": self.authorizationToken!]).responseJSON {
            response in
            if response.result.error != nil {
                fatalError("Error on json response")
            }
            
            let user = User.userFromResponse(response)
            
            self.nameLabel.text = "Name: " + user.name
            self.roleLabel.text = "Role: " + user.role
            self.emailLabel.text = "Email: " + user.email!
            self.activeLabel.text = "Active: " + (user.active != nil ? String(describing: user.active!) : " - ")
            self.createdAt.text = "Created: " + (user.createdAt ?? " - ")
            self.updatedAt.text = "Last update: " + (user.updatedAt ?? " - ")
        }
    }
    
}
