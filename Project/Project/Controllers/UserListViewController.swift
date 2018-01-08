//
//  UserListViewController.swift
//  Project
//
//  Created by Taqtile on 05/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit

class UserListViewController: UITableViewController {
    //MARK: Properties
    var users = [User]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.loadSampleUsers()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "UserTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? UserTableViewCell else {
            fatalError("The dequeued cell is not a instance of UserTableViewCell")
        }
        
        let user = users[indexPath.row]
        
        cell.nameLabel.text = user.name
        cell.roleLabel.text = user.role
    
        return cell
    }
    
    //MARK: Private Methods
    func loadSampleUsers(){
        guard let user1 = User.init(name: "João", role: "Intern") else {
            fatalError("Could not instantiate user1")
        }
        guard let user2 = User.init(name: "Matheus", role: "Intern") else {
            fatalError("Could not instantiate user2")
        }
        guard let user3 = User.init(name: "Pedro", role: "Intern") else {
            fatalError("Could not instantiate user3")
        }
        
        users += [user1, user2, user3]
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
