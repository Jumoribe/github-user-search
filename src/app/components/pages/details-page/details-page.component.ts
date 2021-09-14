import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/core/services/users.service';
import { UserSummary } from 'src/app/shared/models/user-summary.model';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  public respositoriesLength: number = 0;
  public starredUrlsLength: number = 0;
  public username: string | null = 'username';
  public user: UserSummary = new UserSummary('', 0, '', '', '', '', '', '', '', 0, 0);

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userApiService: UsersService,
  ) { }

  /**
   *@description  calls the initial load data method of the page
   */
  public ngOnInit(): void {
    this.getUsernameAtRoutePath();
    this.findUserDetails(this.username);
  }

  /**
   *@description  get username from param url route
   */
  public getUsernameAtRoutePath(): void{
    this.username = this._route.snapshot.paramMap.get('username');
  }

  /**
   *@description  calls github API service, if a result is received call user's repositories, or returns to search users page
   */
  public findUserDetails(username: string | null): void{
    this._userApiService.getUserByUsername(username).subscribe( (res) => {
      this.user = res;
    });

    if (!this.user){
      this._router.navigateByUrl('');
    } else {
      this.findUserRepositories();
    }

  }

  /**
   *@description  calls github API service, to load user repositories by username
   */
  public findUserRepositories(): void{
    this._userApiService.getUserRepositories(this.username).subscribe( (res) => {
      this.respositoriesLength = res?.length;
    });
  }

  /**
   *@description  calls github API service, to load user starred urls by username and count it
   */
  findUserRStarredUrls(username: string): void{
    this._userApiService.getUserStarredUrls(username).subscribe( (res) => {
      this.starredUrlsLength = res?.length;
    });
  }

  /**
   *@description  navigates to repositories details page
   */
  goToRepositories(): void{
    this._router.navigateByUrl(`/${this.username}/repos`);
  }

}
