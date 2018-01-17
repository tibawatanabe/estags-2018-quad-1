//
//  AlertHandler.swift
//  Project
//
//  Created by Taqtile on 11/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import Foundation
import UIKit

class AlertHandler {
    
    //MARK: Methods
    class func show(_ tittle: String, _ alert: String, sender: UIViewController) {
        let alert = UIAlertController(title: tittle, message: alert, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
        sender.present(alert, animated: true, completion: nil)
    }
}
