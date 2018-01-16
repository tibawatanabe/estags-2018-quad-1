//
//  APIResponse.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class LoginResponse {
    var error: Bool
    var message: String?
    var token: String?
    
    required init(error: Bool, message: String?, token: String?) {
        self.error = error
        self.message = message
        self.token = token
    }
}



