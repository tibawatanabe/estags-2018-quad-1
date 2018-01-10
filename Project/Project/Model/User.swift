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
    init?(_ name: String, _ id: Int, _ role: String) {
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
    
    //MARK: Endpoints
    class func getUserListEndpoint() -> String {
        return "https://tq-template-node.herokuapp.com/users?"
    }
    
    class func getUserEndpoint() -> String {
        return "https://tq-template-node.herokuapp.com/user/"
    }
    
    class func getLoginEndpoint() -> String {
        return "https://tq-template-node.herokuapp.com/authenticate"
    }
    
    //MARK: Handle json response
    class func usersArrayFromResponse(_ response: DataResponse<Any>) -> [User] {
        var usersArray = [User]()
        guard let json = response.result.value as? [String: Any] else {
            fatalError("Didn't get json dictionary")
        }
        
        guard let results = json["data"] as? [[String: Any]] else {
            fatalError("Error on json response")
        }
        
        for value in results {
            let id = value[UserFields.id.rawValue] as! Int
            let name = value[UserFields.name.rawValue] as! String
            let role = value[UserFields.role.rawValue] as! String
            
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
        
        guard let data = json["data"] as? [String: Any] else {
            fatalError("Error on json response: could not get data")
        }
        
        let name = ResponseHandler.getTextParameter(from: data[UserFields.name.rawValue], optional: false)
        let role = ResponseHandler.getTextParameter(from: data[UserFields.role.rawValue], optional: false)
        let id = ResponseHandler.getIntParameter(from: data[UserFields.id.rawValue], optional: false)

        let user = User.init(name!, id!, role!)
        
        user?.email = ResponseHandler.getTextParameter(from: data[UserFields.email.rawValue], optional: false)
        user?.createdAt = ResponseHandler.getTextParameter(from: data[UserFields.createdAt.rawValue], optional: true)
        user?.updatedAt = ResponseHandler.getTextParameter(from: data[UserFields.updatedAt.rawValue], optional: true)
        user?.active = ResponseHandler.getBoolParameter(from: data[UserFields.active.rawValue], optional: true)
        
        return user!
    }
}
