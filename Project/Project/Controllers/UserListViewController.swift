//
//  UserListViewController.swift
//  Project
//
//  Created by Taqtile on 05/01/18.
//  Copyright © 2018 Taqtile. All rights reserved.
//

import UIKit
import Foundation
import Alamofire

class UserListViewController: UITableViewController {
    //MARK: Properties
    var users = [User]()
    var authorizationToken: String?
    var currentUser: User?
    var endOfList: Bool?
    var currentPage: Int = 0
    let windowSize = 10
    
    //MARK: Storyboard items
    @IBOutlet var userList: UITableView!
    
    //MARK: UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.initializeUserList()
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
    
    //MARK: Actions
    @IBAction func didPressAddButton(_ sender: UIBarButtonItem) {
        performSegue(withIdentifier: "fromListToCreation", sender: self)
    }
    
    @IBAction func didTapRefreshButton(_ sender: UIBarButtonItem) {
        self.initializeUserList()
    }
    
    //MARK: Table Actions
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        currentUser = users[indexPath.row]
        performSegue(withIdentifier: "fromListToDetail", sender: self)
    }
    
    override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        if indexPath.row == users.count - 1 {
            if self.endOfList == nil {
                return
            }
            getUsersFrom(TemplateAPIHandler.userListEndpoint, on: self.currentPage, showing: 10)
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == nil {
            return
        }
        switch segue.identifier! {
        case "fromListToDetail":
            let nextController = segue.destination as? UserViewController
            guard currentUser != nil else {
                return
            }
            nextController?.userId = currentUser!.id
            nextController?.authorizationToken = self.authorizationToken!
        case "fromListToCreation":
            let nextController = segue.destination as? UserCreationViewController
            guard self.authorizationToken != nil else {
                return
            }
            nextController?.authorizationToken = self.authorizationToken!
        default:
            super.prepare(for: segue, sender: sender)
        }
    }
    
    //MARK: Private Methods
    fileprivate func initializeUserList() {
        self.users = [User]()
        self.userList.reloadData()
        currentPage = 0
        self.getUsersFrom(TemplateAPIHandler.userListEndpoint, on: currentPage, showing: windowSize)
    }
    fileprivate func getUsersFrom(_ path: String, on page: Int, showing window: Int) {
        
        guard let urlComponents = URLComponents(string: path) else {
            fatalError("Tried to load an invalid url")
        }
        
        Alamofire.request(urlComponents, method: .get, parameters: ["pagination": ["page": page, "window": window]], encoding: URLEncoding.default, headers: ["Authorization": self.authorizationToken!]).responseJSON {
            response in
            if response.result.error != nil {
                fatalError("Error on json response")
            }
            self.users += User.usersArrayFromResponse(response)
            self.userList.reloadData()
            self.endOfList = self.checkIfListHasEnded(response)
            self.currentPage += 1
        }
    }
    
    fileprivate func checkIfListHasEnded(_ response: DataResponse<Any>) -> Bool {
        guard let json = response.result.value as? [String: Any] else {
            fatalError("Didn't get json dictionary")
        }
        
        guard let pagination = json["pagination"] as? [String: Any] else {
            fatalError("Error on json response")
        }
        
        guard let page = pagination["page"] as? String else {
            fatalError("Unable to identify page number")
        }
        
        guard let totalPages = pagination["totalPages"] as? Int else {
            fatalError("Unable to identify total number of pages")
        }
        
        if Int(page)! < totalPages - 1 {
            return false
        }
        
        return true
    }
    
    
}
