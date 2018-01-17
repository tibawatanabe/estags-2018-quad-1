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
    
    //MARK: Methods
    func execute(username: String, password: String, rememberMe: Bool) -> Observable<LoginResponse> {
        return Observable.create({ (observer)  in
            let loginParameters: [String: Any] = [loginFields.email.rawValue: username,
                                                  loginFields.password.rawValue: password,
                                                  loginFields.rememberMe.rawValue: rememberMe]
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let postRequest = requestBuilder.post(APIClient.loginEndpoint.rawValue, parameters: loginParameters, headers: nil).build()
            let httpClient = HTTPClient.init()
            
            let requestStream = httpClient.request(postRequest) as Observable<AuthenticateResponse>
            
            let _ = requestStream.subscribe({ response in
                switch response {
                case .next(let value):
                    guard let token = value.data?.token else {
                        guard let errors = value.errors else {
                            observer.onError(response.error!)
                            return
                        }
                        observer.onNext(LoginResponse.init(error: true, message: errors.first?.original, token: nil))
                        observer.onCompleted()
                        return
                    }
                    observer.onNext(LoginResponse.init(error: false, message: nil, token: token))
                    observer.onCompleted()
                case .error(let error):
                    observer.onError(error)
                case .completed:
                    observer.on(.completed)
                }
            })
            return Disposables.create()
        })
    }
}

