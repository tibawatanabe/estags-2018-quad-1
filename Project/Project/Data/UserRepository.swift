//
//  UserRepository.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class UserRepository {
    private var local: UserLocalData?
    
    required init() {
        self.local = UserLocalData.init()
    }
    
    func saveToken(_ authorizationToken: String) {
        local?.save(authorizationToken, forKey: UserFields.token.rawValue)
    }
}
