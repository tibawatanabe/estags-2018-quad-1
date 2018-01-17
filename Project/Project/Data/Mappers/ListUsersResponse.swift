//
//  ListUsersResponse.swift
//  Project
//
//  Created by Taqtile on 16/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import ObjectMapper

class ListUsersResponse: Mappable {
    var data: [UserModel2]?
    var pagination: Pagination?
    var errors: ErrorResponse?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        data        <- map["data"]
        pagination  <- map["pagination"]
        errors      <- map["errors"]
    }
}

class Pagination: Mappable {
    var page: Int?
    var window: Int?
    var total: Int?
    var totalPages: Int?
    private var pageText: String?
    private var windowText: String?
    
    required init?(map: Map) {}
    
    func mapping(map: Map) {
        pageText    <- map["page"]
        windowText  <- map["window"]
        total       <- map["total"]
        totalPages  <- map["totalPages"]
        self.convertTypes()
    }
    
    fileprivate func convertTypes() {
        self.page = self.pageText != nil ? Int(self.pageText!) : nil
        self.window = self.windowText != nil ? Int(self.windowText!) : nil
    }
}
