import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading: boolean =  false;
  private _urlRequestList: Array<string> = new Array<string>();

  constructor() { }

  /**
   * @param requestUrl url requested
   * @description saves the url requested in an array to activate the loading
   */
  public addRequestUrlLoading(requestUrl: string): void {
    this.isLoading = true;
    this._urlRequestList.push(requestUrl);
  }

  /**
   * @param requestUrl url requested
   * @description remove the url requested that was resolved from an array to stop the loading
   */
  public removeRequestUrlLoading(requestUrl: string): void {
    const requestIndex =  this._urlRequestList.findIndex((request: string) => request === requestUrl);
    this._urlRequestList.splice(requestIndex, 1);
    if (this._urlRequestList.length <= 0){
      this.isLoading = false;
    }
  }

}
