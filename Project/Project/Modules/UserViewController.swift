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
//        UserItems.storeObject(self.authorizationToken!, forKey: "authorizationToken")
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
        let id = UserRepository.init().retriveUserId()
        
        let requestStream = UserDetailUseCase.init().execute(id: id)
        
        let _ = requestStream.subscribe({ result in
            switch result {
            case .next(let value):
                guard let userDetails = value.data as? UserModel else {
                    fatalError("Unable to retrieve user details")
                }
                self.fillTextFields(with: userDetails)
            default:
                return
            }
            
        })
    }
    
    fileprivate func deleteUser() {
        //TODO
    }
    
    fileprivate func fillTextFields(with userDetails: UserModel) {
        self.nameLabel.text = "Name: " + userDetails.name!
        self.roleLabel.text = "Role: " + userDetails.role!
        self.emailLabel.text = "Email: " + userDetails.email!
        self.activeLabel.text = "Active: " + (userDetails.active != nil ? String(describing: userDetails.active!) : " - ")
        self.createdAt.text = "Created: " + (userDetails.createdAt ?? " - ")
        self.updatedAt.text = "Last update: " + (userDetails.updatedAt ?? " - ")
    }
}

