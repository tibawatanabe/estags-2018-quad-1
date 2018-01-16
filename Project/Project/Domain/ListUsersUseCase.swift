//
//  UserListUseCase.swift
//  Project
//
//  Created by Taqtile on 16/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import RxSwift

enum ListUsersFields: String {
    case Authorization = "Authorization"
    case pagination = "pagination"
    case page = "page"
    case window = "window"
}

class ListUsersUseCase {
    let userRepository: UserRepository
    
    init() {
        self.userRepository = UserRepository.init()
    }
    
    //MARK: Methods
    func execute(page: Int, window: Int) -> Observable<APIResponse> {
        return Observable.create({ (observer) -> Disposable in
            let authorizationToken = self.userRepository.retrieveToken()
            let headerParameters = [ListUsersFields.Authorization.rawValue: authorizationToken]
            let pagination = [ListUsersFields.pagination.rawValue:
                [ListUsersFields.page.rawValue: page, ListUsersFields.window.rawValue: window]]
            
            let requestBuilder = RequestBuilder.init(baseUrl: APIClient.baseUrl.rawValue)
            let getRequest = requestBuilder.get(APIClient.userListEndpoint.rawValue, parameters: pagination, headers: headerParameters).build()
            let httpClient = HTTPClient.init()
            
            let requestStream = httpClient.request(getRequest) as Observable<ListUsersResponse>
            
            let _ = requestStream.subscribe({ event in
                switch event {
                case .next(let value):
                    if value.data != nil {
                        observer.onNext(APIResponse.init(data: value, error: nil))
                    }
                    else if value.errors != nil {
                        let error = ErrorContent.init(tittle: (value.errors?.name)!, message: (value.errors?.original)!)
                        observer.onNext(APIResponse.init(data: nil, error: error))
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
