import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { CustomValidator } from 'src/app/core/validators/custom.validator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  public user!: User;
  public githubUsername = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(39), CustomValidator.isValidUsername()]);

  constructor(
    private _router: Router,
    private _usersApiService: UsersService
  ) { }


  /**
   * @description Call github API to get a user by username
   */
  public submitUser(): void {
    this.githubUsername.markAsTouched();
    this._resetUserFound();

    if (this.githubUsername.invalid){
      return;
    }
    this._usersApiService.getUserByUsername(this.githubUsername.value).subscribe( (res) => {
      this.user = res;
      this._router.navigateByUrl(this.githubUsername.value);
    },
    (error) =>{
      window.alert(error?.error?.message);
    });
  }

  /**
   * @description reset the Subject at UserApiService until be replaced for a neew user
   */
  private _resetUserFound(): void{
    this._usersApiService.resetFoundUser();
    this._usersApiService.resetRepositories();
  }

}
