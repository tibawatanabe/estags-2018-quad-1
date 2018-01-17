//
//  DefaultResponse.swift
//  Project
//
//  Created by Taqtile on 17/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import ObjectMapper

class UserDetailResponse: Mappable {
    var data: UserModel2?
    var errors: ErrorResponse?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        data <- map["data"]
        errors <- map["errors"]
    }
}
