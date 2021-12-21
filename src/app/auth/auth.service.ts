import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import { IUserName } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private dataSubscription: Subscription = new Subscription();
  public currentRole: string  = "user";
  // public accountName: Subject<IUserName> = new Subject<IUserName>();
  // public accountNameList: IUserName | undefined;

  constructor(
  ) {
    // this.dataSubscription.add(this.accountName.subscribe((currentLogin1: IUserName) => {
    //   this.accountNameList = currentLogin1;
    // }))
  }

  public setJWTToLocalStorage(JWTToken: string): void {
    localStorage.setItem('token', JWTToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public isCurrentUserAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  public logout() {
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
