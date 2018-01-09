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
    var id: Int
    var role: String
    var email: String?
    var active: Bool?
    var createdAt: String?
    var updatedAt: String?
    
    //MARK: Initialization
    init?(_ name: String, _ id: Int, _ role: String){
        if name.isEmpty {
            return nil
        }
        
        if id < 0 {
            return nil
        }
        
        self.name = name
        self.id = id
        self.role = role
    }
    
    class func getUsersEndpoint() -> String{
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
            let id = value["id"] as! Int
            let name = value["name"] as! String
            let role = value["role"] as! String
            
            guard let user = User.init(name, id, role) else {
                fatalError("Could not instantiate user")
            }
            
            usersArray += [user]
        }
        
        return usersArray
    }
    
    class func userFromResponse(_ response: DataResponse<Any>) -> User {
        guard let json = response.result.value as? [String: Any] else {
            fatalError("Didn't get json dictionary")
        }
        
        guard let data = json["data"] as? [[String: Any]] else {
            fatalError("Error on json response: could not get data")
        }
        
        guard let userInfo = data.first as? [String:Any] else {
            fatalError("Empty data")
        }
        
        let name = ResponseHandler.getTextParameter(from: userInfo[UserFields.name.rawValue]!)
        let role = ResponseHandler.getTextParameter(from: userInfo[UserFields.role.rawValue]!)
        let id = ResponseHandler.getIntParameter(from: userInfo[UserFields.id.rawValue]!)
        
        let user = User.init(name, id, role)
        
        return user!
    }
}
