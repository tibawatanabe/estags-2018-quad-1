//
//  UserRepository.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class UserRepository {
    //MARK: Properties
    private var local: UserLocalData?
    
    //MARK: Private constants
    private let userInfoKey = "user_detail_info"
    
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
    
    func saveUserInfo(_ user: UserModel) {
        let userDictionary = [UserFields.name.rawValue: user.name,
                              UserFields.email.rawValue: user.email,
                              UserFields.role.rawValue: user.role]
        self.local?.save(userDictionary, forKey: userInfoKey)
    }
    
    func retrieveUserInfo() -> UserModel {
        guard let userInfo = local?.retrieve(forKey: userInfoKey) as? [String: Any] else {
            fatalError("Unable to retrieve user information")
        }
        guard let user = UserModel(JSON: userInfo) else {
            fatalError("Could not map json object to UserModel")
        }
        return user
    }
}
