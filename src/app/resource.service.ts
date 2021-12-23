import { Injectable } from '@angular/core';
import {ISimpleUser, ILoginInform, IUserInfo, IAnnouncement } from "../app/models/interfaces";
import {HttpClient} from "@angular/common/http";
import {shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private api = 'https://localhost:44399';

  constructor( private http: HttpClient ) { }

  public login(userInfoApi : FormData) {
    return this.http.post<ILoginInform>(this.api + '/login', userInfoApi).pipe(shareReplay());
  }

  // register
  public addNewUser(userInfoApi: FormData) {
    return this.http.post<ISimpleUser>(this.api + '/register', userInfoApi).pipe(shareReplay());
  }

  public addNewUserInfo(userInfoApi: any) {
    return this.http.post<IUserInfo>(this.api + '/api/UserInfoes/', userInfoApi);
  }

  public ChangeUserInfo(userInfoApi: any) {
    return this.http.put<IUserInfo>(this.api + '/api/UserInfoes/', userInfoApi);
  }

  public addNewAnnouncement(ann: any) {
    console.log('zxc');
    return this.http.post<IAnnouncement>(this.api + '/api/Announcements/', ann);
  }
  public ChangeAnnouncement(cann: any){
    return this.http.put<IAnnouncement>(this.api + '/api/Announcements', cann)
  }

  public getUsers() {
    return this.http.get(this.api + '/api/UserAccounts');
  }

  public getUser(userid: any) {
    return this.http.get(this.api + '/api/UserAccounts/' + userid);
  }

  public getUsersInfo() {
    return this.http.get(this.api + '/api/UserInfoes');
  }

  public GetUserInfoFromId(useracid: any){
    return this.http.get(this.api + '/api/GetUserInfoFromId?id=' + useracid);
  }

  public getUserInfo(userUnfoId: any) {
    return this.http.get(this.api + '/api/GetUserInfo?id=' + userUnfoId);
  }

  public getAnnouncements() {
    return this.http.get(this.api + '/api/Announcements');
  }

  public getAnnouncement(anId: any) {
    return this.http.get(this.api + '/api/Announcements/' + anId);
  }

  public deleteAnnouncement(anId: any){
    return this.http.delete(this.api + '/api/Announcements/' + anId);
  }

  public getUserBrands(BrandName: any) {
    return this.http.get(this.api + '/api/GetAnnouncements?brand=' + BrandName);
  }

  public getBrands() {
    return this.http.get(this.api + '/api/GetBrand');
  }

}
