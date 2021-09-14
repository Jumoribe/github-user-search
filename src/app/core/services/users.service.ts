import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl : string = 'https://api.github.com/users/';

  public repositories = [];
  public repositoriesSubject: Subject<any> = new ReplaySubject<any>(1);
  public user!: User | null;
  public userSubject: Subject<any> = new ReplaySubject<any>(1);

  constructor(
    public http: HttpClient
  ) { }

  /**
   * @param username
   * @return user data from github API service
   */
  public getUserByUsername(username: any): Observable<User> {
    if (this.user){
      this.userSubject.next(this.user);
      return this.userSubject;
    }
    const url = `${this.baseUrl}${username}`;
    return this.http.get<User>(url).pipe( tap(res => {
      this.user = res;
      this.userSubject.next(this.user);
    }));
  }

  /**
   * @param username
   * @return user repositories data from github API service
   */
  public getUserRepositories(username: any): Observable<any>{
    if (this.repositories.length > 0){
      this.repositoriesSubject.next(this.repositories);
      return this.repositoriesSubject;
    }
    const url = `${this.baseUrl}${username}/repos`;
    return this.http.get<any>(url).pipe( tap(res => {
      this.repositories = res;
      this.repositoriesSubject.next(this.repositories);
    }));
  }

  /**
   * @param username
   * @return user stared urls data from github API service
   */
  public getUserStarredUrls(username: string): Observable<any>{
    const url = `${this.baseUrl}${username}/starred`;
    return this.http.get<any>(url);
  }

  /**
   * @description reset the this.user variable to do the API request instead get the Subjetc (userSubject) value
   */
  public resetFoundUser(): void {
    this.user = null;
  }

  /**
   * @description reset the this.repositories variable to do the API request instead get the Subjetc (repositoriesSubject) value
   */
  public resetRepositories(): void {
    this.repositories = [];
  }

}
