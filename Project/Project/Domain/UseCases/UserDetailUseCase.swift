//
//  UserDetailUseCase.swift
//  Project
//
//  Created by Taqtile on 16/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

class UserDetailUseCase {
    private var userRepository: UserRepository
    
    required init() {
        self.userRepository = UserRepository.init()
    }
    
    func execute(id: Int) -> Observable<APIResponse> {
        return Observable.create({ (observer) -> Disposable in
            let authorizationToken = self.userRepository.retrieveToken()
            let headerParameters = [ListUsersFields.Authorization.rawValue: authorizationToken]
            
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let getRequest = requestBuilder.get("\(APIClient.userDataEndpoint.rawValue)\(id)", parameters: nil, headers: headerParameters).build()
            let httpClient = HTTPClient.init()
            
            let requestStream = httpClient.request(getRequest) as Observable<UserDetailResponse>
            
            let _ = requestStream.subscribe({response in
                switch response {
                case .next(let value):
                    observer.onNext(APIResponse.init(data: value.data, error: nil))
                default:
                    return
                }
            })
            
            return Disposables.create()
        })
    }
}
