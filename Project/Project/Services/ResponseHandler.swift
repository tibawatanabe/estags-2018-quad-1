//
//  ResponseHandler.swift
//  Project
//
//  Created by Taqtile on 09/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation

class ResponseHandler {
    class func getTextParameter(from parameter: Any?, optional: Bool) -> String? {
        guard let stringParameter = parameter as? String else {
            if (optional) {
                return nil
            }
            fatalError("Could not get string parameter")
        }
        return stringParameter
    }
    
    class func getIntParameter(from parameter: Any?, optional: Bool) -> Int? {
        guard let intParameter = parameter as? Int else {
            if (optional) {
                return nil
            }
            fatalError("Could not get int parameter")
        }
        return intParameter
    }
    
    class func getBoolParameter(from parameter: Any?, optional: Bool) -> Bool? {
        guard let boolParameter = parameter as? Bool else {
            if (optional) {
                return nil
            }
            fatalError("Could not get bool parameter")
        }
        return boolParameter
    }
}
