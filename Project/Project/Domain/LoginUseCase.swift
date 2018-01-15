//
//  LoginUseCase.swift
//  Project
//
//  Created by Taqtile on 15/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

enum loginFields: String {
    case email = "email"
    case password = "password"
    case rememberMe = "rememberMe"
}

struct LoginUseCase {
    func execute(username: String, password: String, rememberMe: Bool) {
        let requestStream: Observable<String> = Observable.just(APIClient.baseUrl.rawValue)
        
        let loginParameters: [String: Any] = [loginFields.email.rawValue: username,
                               loginFields.password.rawValue: password,
                               loginFields.rememberMe.rawValue: rememberMe]
        
        let responseStream = requestStream.flatMap { (baseUrl) -> Observable<AuthenticateResponse> in
            let requestBuilder = RequestBuilder.init(baseUrl: baseUrl)
            let postRequest = requestBuilder.post(APIClient.loginEndpoint.rawValue, parameters: loginParameters, headers: nil).build()
            let httpClient = HTTPClient.init()
            return httpClient.request(postRequest)
        }
        
        let _ = responseStream.subscribe { event in
            switch event {
            case .next(let value):
                guard let user = value.data?.user else {
                    print(value.errors?.first?.original!)
                    return
                }
                UserRepository.init().saveToken((value.data?.token)!)
            case .error(let error):
                print (error)
            case .completed:
                return
            }
        }

        
    }
}

