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
        self.local?.save(authorizationToken, forKey: UserFields.token.rawValue)
    }
    
    func retrieveToken() -> String {
        guard let token = local?.retrieve(forKey: UserFields.token.rawValue) as? String else {
            fatalError("Unable to retrieve token")
        }
        return token
    }
    
    func saveUserId(_ id: Int) {
        self.local?.save(id, forKey: UserFields.id.rawValue)
    }
    
    func retriveUserId() -> Int {
        guard let id = local?.retrieve(forKey: UserFields.id.rawValue) as? Int else {
            fatalError("Unable to retrieve user id")
        }
        return id
    }
}
