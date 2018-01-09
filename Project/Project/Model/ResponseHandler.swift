//
//  ResponseHandler.swift
//  Project
//
//  Created by Taqtile on 09/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class ResponseHandler {
    class func getTextParameter(from parameter: Any) -> String{
        guard let stringParameter = parameter as? String else {
            fatalError("Could not get string parameter")
        }
        return stringParameter
    }
    
    class func getIntParameter(from parameter: Any) -> Int{
        guard let intParameter = parameter as? Int else {
            fatalError("Could not get int parameter")
        }
        return intParameter
    }
}
