//
//  UserModels.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import ObjectMapper

class UserModel: Mappable {
    var id: Int?
    var active: Bool?
    var email: String?
    var activationToken: String?
    var createdAt: String?
    var updatedAt: String?
    var name: String?
    var role: String?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        id              <- map["id"]
        active          <- map["active"]
        email           <- map["email"]
        activationToken <- map["activationToken"]
        createdAt       <- map["createdAt"]
        updatedAt       <- map["updatedAt"]
        name            <- map["name"]
        role            <- map["role"]
    }
}
