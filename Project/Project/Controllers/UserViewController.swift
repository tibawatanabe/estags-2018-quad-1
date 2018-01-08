//
//  UserViewController.swift
//  Project
//
//  Created by Taqtile on 08/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit

class UserViewController: UIViewController {
    //MARK: Properties
    var user: User?
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var roleLabel: UILabel!
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard user != nil else {
            return
        }
        
        nameLabel.text = user?.name
        roleLabel.text = user?.role
    }
    
    
}
