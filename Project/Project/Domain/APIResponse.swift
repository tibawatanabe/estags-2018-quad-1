//
//  APIResponse.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation


struct APIResponse {
    var data: Any? = nil
    var error: ErrorContent? = nil
    
    init(data: Any?, error: ErrorContent?) {
        self.data = data
        self.error = error
    }
    
}

struct ErrorContent {
    var tittle: String
    var message: String
    
    init(tittle: String, message: String) {
        self.tittle = tittle
        self.message = message
    }
}


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


