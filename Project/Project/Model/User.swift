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
        guard !name.isEmpty else{
            return nil
        }
        
        guard !role.isEmpty else{
            return nil
        }
        
        self.name = name
        self.role = role
    }
    
}
