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
    var users = [UserModel2]()
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
//        currentUser = users[indexPath.row]
        performSegue(withIdentifier: "fromListToDetail", sender: self)
    }
    
    override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        if indexPath.row == users.count - 1 {
            if self.endOfList == nil {
                return
            }
            else if !self.endOfList! {
                self.getUserList(on: self.currentPage, showing: 10)
            }
        }
    }
    
    //MARK: Private Methods
    fileprivate func initializeUserList() {
        self.users = [UserModel2]()
        self.userList.reloadData()
        currentPage = 0
        
        self.getUserList(on: currentPage, showing: windowSize)
    }
    
    fileprivate func getUserList(on page: Int, showing window: Int) {
        let userListStream = ListUsersUseCase.init().execute(page: page, window: window)
        
        let _ = userListStream.subscribe({ result in
            switch result {
            case .next(let value):
                if let response = value.data as? ListUsersResponse {
                    self.users += response.data!
                    self.endOfList = self.checkIfListHasEnded(pagination: response.pagination!)
                    self.currentPage += 1
                } else {
                    fatalError("Unable to retrieve user list")
                }
            default:
                return
            }
        })
        DispatchQueue.main.sync(execute: self.userList.reloadData)
    }
    
    fileprivate func checkIfListHasEnded(pagination: Pagination) -> Bool {
        guard let page = pagination.page, let totalPages = pagination.totalPages else {
            fatalError("Unable to retrieve page information")
        }
        if page < totalPages - 1 {
            return false
        }
        return true
    }

    
    
}
