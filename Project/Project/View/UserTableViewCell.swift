//
//  UserTableViewCell.swift
//  Project
//
//  Created by Taqtile on 05/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit

class UserTableViewCell: UITableViewCell {
    //MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var roleLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
