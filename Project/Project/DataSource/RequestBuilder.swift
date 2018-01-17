//
//  RequestBuilder.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import Alamofire

struct HTTPRequest {
    var url: String = "/"
    var parameters: [String: Any]?
    var method: Alamofire.HTTPMethod = .get
    var encoding: ParameterEncoding = URLEncoding(destination: .queryString)
    var authenticated: Bool = false
    var headers: [String: String] = [:]
}

class RequestBuilder {
    private var baseUrl: String
    private var httpRequest = HTTPRequest()
    
    required init(baseUrl: String) {
        self.baseUrl = baseUrl
    }
    
    func post(_ url: String, parameters: [String: Any]?, headers: [String: String]?) -> RequestBuilder {
        self.createRequest(.post, "\(self.baseUrl)\(url)", parameters, JSONEncoding.default)
        
        if headers != nil {
            for (key, value) in headers! {
                self.appendHeader(key, with: value)
            }
        }
        
        return self
    }
    
    func get(_ url: String, parameters: [String: Any]?, headers: [String: String]?) -> RequestBuilder {
        self.createRequest(.get, "\(self.baseUrl)\(url)", parameters, URLEncoding.default)
        
        if headers != nil {
            for (key, value) in headers! {
                self.appendHeader(key, with: value)
            }
        }
        
        return self
    }
    
    func put(_ url: String, parameters: [String: Any]?, headers: [String: String]?) -> RequestBuilder {
        self.createRequest(.put, "\(self.baseUrl)\(url)", parameters, JSONEncoding.default)
        
        if headers != nil {
            for (key, value) in headers! {
                self.appendHeader(key, with: value)
            }
        }
        
        return self
    }
    
    func delete(_ url: String, headers: [String: String]?) -> RequestBuilder {
        self.createRequest(.delete, "\(self.baseUrl)\(url)", nil, JSONEncoding.default)
        
        if headers != nil {
            for (key, value) in headers! {
                self.appendHeader(key, with: value)
            }
        }
        
        return self
    }
    
    func appendHeader(_ key: String, with value: String) {
        self.httpRequest.headers[key] = value
    }
    
    func createRequest(_ method: Alamofire.HTTPMethod, _ url: String, _ parameters: [String: Any]?, _ encoding: ParameterEncoding) {
        self.httpRequest = HTTPRequest()
        self.httpRequest.method = method
        self.httpRequest.url = url
        self.httpRequest.parameters = parameters
        self.httpRequest.encoding = encoding
    }
    
    func build() -> HTTPRequest {
        return self.httpRequest
    }
    
}
