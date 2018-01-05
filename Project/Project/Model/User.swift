//
//  User.swift
//  Project
//
//  Created by Taqtile on 05/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class User{
    //MARK: Properties
    var name: String
    var role: String
    
    //MARK: Initialization
    init?(name: String, role: String){
        if name.isEmpty || role.isEmpty {
            return nil
        }
        
        self.name = name
        self.role = role
    }
    
}
