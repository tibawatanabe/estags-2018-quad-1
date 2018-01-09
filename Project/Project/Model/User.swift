//
//  User.swift
//  Project
//
//  Created by Taqtile on 05/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import Alamofire

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
    
    class func getUserListEndpoint() -> String{
        return "https://tq-template-node.herokuapp.com/users?"
    }
    
    class func getLoginEndpoint() -> String {
        return "https://tq-template-node.herokuapp.com/authenticate"
    }
    
    class func usersArrayFromResponse(_ response: DataResponse<Any>) -> [User] {
        var usersArray = [User]()
        guard let json = response.result.value as? [String: Any] else {
            fatalError("Didn't get json dictionary")
        }
        
        guard let results = json["data"] as? [[String: Any]] else {
            fatalError("Error on json response")
        }
        
        for value in results {
            let role = String(value["id"] as! Int)
            let name = value["name"] as! String
            
            guard let user = User.init(name: name, role: role) else {
                fatalError("Could not instantiate user")
            }
            
            usersArray += [user]
        }
        
        return usersArray
    }
    
}
