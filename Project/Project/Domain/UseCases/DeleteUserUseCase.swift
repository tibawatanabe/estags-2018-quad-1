//
//  DeleteUserUseCase.swift
//  Project
//
//  Created by Taqtile on 17/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

class DeleteUsersUseCase {
    private var userRepository: UserRepository
    
    required init() {
        self.userRepository = UserRepository.init()
    }
    
    func execute(id: Int) -> Observable<APIResponse> {
        return Observable.create({ (observer) -> Disposable in
            let authorizationToken = self.userRepository.retrieveToken()
            let headerParameters = [ListUsersFields.Authorization.rawValue: authorizationToken]
            
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let deleteRequest = requestBuilder.delete(APIClient.userDataEndpoint.rawValue + String(id), headers: headerParameters).build()
            
            let httpClient = HTTPClient.init()
            let deleteUserStream = httpClient.request(deleteRequest) as Observable<CreateUserResponse>
            
            let _ = deleteUserStream.subscribe({ response in
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
