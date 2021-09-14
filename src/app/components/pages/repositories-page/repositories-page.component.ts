import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-repositories-page',
  templateUrl: './repositories-page.component.html',
  styleUrls: ['./repositories-page.component.scss']
})
export class RepositoriesPageComponent implements OnInit {

  public username: string | null = 'username';
  public sortList = {
    name: false,
    watchers:  false,
    language: false,
    stargazers_count: false
  }

  public repositories: any =[]

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userApiService: UsersService,
  ) { }

  /**
   *@description  calls the initial load data method of the page
   */
  ngOnInit(): void {
    this.username = this._route.snapshot.paramMap.get('username');
    this._getRepositories();
  }

  /**
   *@description  calls the initial load data method of the page
   */
  private _getRepositories(): void {
    this._userApiService.getUserRepositories(this.username).subscribe( (res) => {
      this.repositories = res;
    });

    if (this.repositories.length === 0){
      this._router.navigateByUrl('');
    }
  }

  /**
   *@description  sorts the repositories list in ascending order
   */
  public orderByAsc(item: string): void{
    this.repositories.sort( (a: any, b: any) => {
      if( a[item] < b[item]) { return -1;}
      if( a[item] === null) { return -1;}
      if( a[item] > b[item]) { return 1;}
      return 0;
    });
  }

  /**
   *@description  sorts the repositories list in descending order
   */
  public orderByDec(item: string): void{
    this.repositories.sort( (a: any, b: any) => {
      if( a[item] > b[item]) { return -1;}
      if( a[item] === null) { return -1;}
      if( a[item] < b[item]) { return 1;}
      return 0;
    });
  }


}
