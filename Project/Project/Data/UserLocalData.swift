//
//  UserItems.swift
//  Project
//
//  Created by Taqtile on 11/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class UserLocalData {
    //MARK: Properties
    private var userDefaults: UserDefaults
    
    required init() {
        self.userDefaults = UserDefaults.standard
    }
    
    //MARK: Methods
    func save(_ object: Any, forKey: String) {
        self.userDefaults.set(object, forKey: forKey)
    }
    
    func retrieve(forKey: String) -> Any? {
        guard let object = self.userDefaults.object(forKey: forKey) as Any? else {
            return nil
        }
        return object
    }
    
}
