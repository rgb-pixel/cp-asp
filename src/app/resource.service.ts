import { Injectable } from '@angular/core';
import {ISimpleUser, ILoginInform, IUserInfo, IAnnouncement } from "../app/models/interfaces";
import {HttpClient} from "@angular/common/http";
import {shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private api = 'https://localhost:44398';

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
    
    return this.http.post<IAnnouncement>(this.api + '/api/Announcements/', ann);
  }

  public addNewPhoto(formData: FormData) {
    return this.http.post("https://api.cloudinary.com/v1_1/dap6zmhqc/image/upload", formData);
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

  public getUsersInfo(userAcId:any) {
    return this.http.get(this.api + '/api/UserInfoes/' + userAcId);
  }

  public GetUserInfoFromId(useracid: any){
    return this.http.get(this.api + '/api/GetUserInfoFromId?id=' + useracid);
  }

  public getUserInfo(userUnfoId: any) {
    return this.http.get(this.api + '/api/GetUserInfo?id=' + userUnfoId);
  }

  public updateUserInfo(id: any) {
    return this.http.put(this.api + '/api/UserInfoes/', id);
  }

  public deleteUserInfo(id: any) {
    return this.http.delete(this.api + '/api/UserInfoes/' + id);
  }

  public getAnnouncements() {
    return this.http.get(this.api + '/api/Announcements');
  }

  public getAnnouncement(anId: any) {
    return this.http.get(this.api + '/api/Announcements/' + anId);
  }

  public getMyAnnouncements(anId: any) {
    return this.http.get(this.api + '/api/authOption/' + anId);
  }

  public getAnnouncementArray(anId: any) {
    return this.http.get(this.api + '/api/Announcements1/' + anId);
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
  
  public addRecall(dataR: any){
    return this.http.post(this.api + '/api/Recalls', dataR);
  }

  public getRecall(dataR: any){
    return this.http.get(this.api + '/api/Recalls/' + dataR);
  }

  public addFavorites(dataF: any){
    return this.http.post(this.api + '/api/Favorites', dataF);
  }

  public getFavorites(dataF: any){
    return this.http.get(this.api + '/api/Favorites/' + dataF);
  }
}
