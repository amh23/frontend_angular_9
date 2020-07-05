import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlobalConstants } from '../../common/global-constants';

import { USERS } from '../mock-users';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUsers(): Observable<User[]>{
    return of(USERS);
  }

  getUser(id: number){
    return of(USERS.find(user => user.id == id));
  }

  login(email, password){
    //return this.http.post<any>(`users/authenticate`,{ username, password })
    //  .pipe(map(user => {
    //    localStorage.setItem('currentUser',JSON.stringify(user));
    //    this.currentUserSubject.next(user);
    //    return user;
    //  }));

    return this.http.post<any>(`${GlobalConstants.apiUrl}/users/authenticate`,{ email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
    
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
