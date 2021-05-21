import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'is-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private us: UserService) {}

  ngOnInit() {
    this.us.getAllUsers().subscribe(res => (this.users = res));
  }

  //TODO: Muss ich hier den Login auch berücksichtigen?
}
