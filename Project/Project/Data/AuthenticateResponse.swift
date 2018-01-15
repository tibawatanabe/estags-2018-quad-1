//
//  AuthenticateResponse.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import ObjectMapper

class AuthenticateResponse: Mappable {
    var data: LoginDataResponse?
    var errors: [ErrorResponse]?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        data <- map["data"]
        errors <- map["errors"]
    }
}

class LoginDataResponse: Mappable {
    var user: [String: Any]?
    var token: String?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        user <- map["user"]
        token <- map["token"]
    }
}

class ErrorResponse: Mappable {
    var name: String?
    var original: String?
    
    required init?(map: Map) { }
    
    func mapping(map: Map) {
        name <- map["name"]
        original <- map["original"]
    }
}
