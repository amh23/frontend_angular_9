import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: any;

  constructor(private userService: UserService,
              private router: Router) {
                this.userService.currentUser.subscribe(x => this.currentUser = x);
               }

  ngOnInit(): void {
     
  }

  logout(){
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
