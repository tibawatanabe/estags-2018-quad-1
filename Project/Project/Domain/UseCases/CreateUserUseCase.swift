//
//  CreateUserUseCase.swift
//  Project
//
//  Created by Taqtile on 17/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

class CreateUserUseCase {
    private var userRepository: UserRepository
    
    required init() {
        self.userRepository = UserRepository.init()
    }
    
    func execute(userParameters: [String: String]) -> Observable<APIResponse> {
        return Observable.create({ (observer) -> Disposable in
            let authorizationToken = self.userRepository.retrieveToken()
            let headerParameters = [ListUsersFields.Authorization.rawValue: authorizationToken]
            
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let postRequest = requestBuilder.post(APIClient.userDataEndpoint.rawValue, parameters: userParameters, headers: headerParameters).build()
            
            let httpClient = HTTPClient.init()
            let requestStream = httpClient.request(postRequest) as Observable<CreateUserResponse>
            
            let _ = requestStream.subscribe({ response in
                switch response {
                case .next(let value):
                    if let data = value.data {
                        observer.onNext(APIResponse.init(data: data, error: nil))
                    } else if let errors = value.errors {
                        let errorContent =  ErrorContent.init(tittle: errors.name!, message: errors.message!)
                        observer.onNext(APIResponse.init(data: nil, error: errorContent))
                    }
                    observer.onCompleted()
                default:
                    return
                }
            })
            
            return Disposables.create()
        })
    }
}
