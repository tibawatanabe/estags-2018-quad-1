//
//  UserUpdateUseCase.swift
//  Project
//
//  Created by Taqtile on 17/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

class UserUpdateUseCase {
    private var userRepository: UserRepository
    
    required init() {
        self.userRepository = UserRepository.init()
    }
    
    func execute(id: Int, userParameters: [String: String]) -> Observable<APIResponse> {
        return Observable.create({ (observer) -> Disposable in
            let authorizationToken = self.userRepository.retrieveToken()
            let headerParameters = [ListUsersFields.Authorization.rawValue: authorizationToken]
            
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let putRequest = requestBuilder.put(APIClient.userDataEndpoint.rawValue + String(id), parameters: userParameters, headers: headerParameters).build()
            
            let httpClient = HTTPClient.init()
            
            let requestStream = httpClient.request(putRequest) as Observable<UserDetailResponse>
            
            let _ = requestStream.subscribe({ response in
                switch response {
                case .next(let value):
                    if value.data != nil {
                        observer.onNext(APIResponse.init(data: value.data, error: nil))
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
