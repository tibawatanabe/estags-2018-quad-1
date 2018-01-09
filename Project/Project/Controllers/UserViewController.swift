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
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var roleLabel: UILabel!
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.getUserDetails()
        super.viewWillAppear(animated)
    }
    
    //MARK: Private methods
    fileprivate func getUserDetails(){
        
        guard userId != nil else {
            fatalError("Empty id")
        }
        
        guard let urlComponents = URLComponents(string: User.getUsersEndpoint()) else {
            fatalError("Tried to load an invalid url")
        }
        
        Alamofire.request(urlComponents, method: .get, parameters: ["id": String(self.userId!)], encoding: URLEncoding.default, headers: ["Authorization": self.authorizationToken!]).responseJSON {
            response in
            if response.result.error != nil {
                fatalError("Error on json response")
            }
            
            let user = User.userFromResponse(response)
            
        }
    }
    
}
