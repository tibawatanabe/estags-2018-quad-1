//
//  HttpClient.swift
//  Project
//
//  Created by Taqtile on 12/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Alamofire
import AlamofireObjectMapper
import Foundation
import ObjectMapper
import RxSwift

enum APIClient: String {
    case baseUrl = "https://tq-template-node.herokuapp.com/"
    case loginEndpoint = "authenticate"
    case userDataEndpoint = "user"
    case userListPoint = "users"
}

class HTTPClient {
    
    required init() {}
    
    let sessionManager: SessionManager = {
        let config = URLSessionConfiguration.default
        config.requestCachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        config.urlCache = nil
        config.httpCookieStorage = HTTPCookieStorage.shared
        
        let manager = Alamofire.SessionManager(configuration: config)
        return manager
    }()

    func request(_ httpRequest: HTTPRequest) -> Observable<AuthenticateResponse> {
        return Observable.create({ (observer) -> Disposable in
            let request = Alamofire.request(httpRequest.url, method: httpRequest.method,
                                                      parameters: httpRequest.parameters, encoding: httpRequest.encoding, headers: httpRequest.headers)
                .responseObject{ (response: Alamofire.DataResponse<AuthenticateResponse>) -> Void in
                    guard let data = response.result.value else {
                        observer.onError(response.result.error!)
                        return
                    }
                    observer.on(.next((data)))
                    observer.on(.completed)
                }

            return Disposables.create{ request.cancel() }
        })
    }
}
