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
    var currentUser: User?
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //TODO: Instead of loading sample users, get them from server
        self.loadSampleUsers()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    //MARK: UITableViewController
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
        
        cell.nameLabel.text = users[indexPath.row].name
        cell.roleLabel.text = users[indexPath.row].role
        
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        currentUser = users[indexPath.row]
        dismiss(animated: true, completion: nil)
        performSegue(withIdentifier: "fromListToDetail", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "fromListToDetail") {
            let nextController = segue.destination as? UserViewController
            guard currentUser != nil else {
                return
            }
            nextController?.user = currentUser!
        }
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
        
        for _ in 1...10 {
            guard let user = User.init(name: "Testing", role: "test") else {
                return
            }
            users += [user]
        }
    }
}
