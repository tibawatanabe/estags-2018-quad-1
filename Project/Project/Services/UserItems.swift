//
//  UserItems.swift
//  Project
//
//  Created by Taqtile on 11/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class UserItems {
    //MARK: Methods
    class func storeObject(_ object: Any, forKey: String) {
        let defaults = UserDefaults.standard
        defaults.set(object, forKey: forKey)
    }
    
    class func getObject(forKey: String) -> Any? {
        let defaults = UserDefaults.standard
        guard let object = defaults.object(forKey: forKey) as Any? else {
            return nil
        }
        return object
    }
    
}
