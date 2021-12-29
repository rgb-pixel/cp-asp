import {PopupMode} from "./types";

export interface ILoginInform {
  id: string;
  access_token: string;
  username: string;
  role: string;
}

export interface IUser {
  id: number;
  login: string;
  role: string;
  userInfo? : Array<any>
}

export interface ISimpleUser {
  username: string;
  password: string;
  role: string;
}

export interface IUserInfo{
  Id: number;
  userName: string;
  userEmail: string;
  city: string;
  userId? : number;
}

export interface IUserName{
  userLogoName:string;
}

export interface IAnnouncement{
  id: number;
  brand: string;
  model: string;
  price: number;
  carImage: string;
  carYear: number;
  typeOfDriverUnit: string;
  engineCapacity: number;
  mileage: number;
  anDescription: string;
  userPhone: string;
  announcementStatus: string;
  userInfoId?: number;
}

export interface IBrand{
  brand:string;
}

export interface IRecall{
  Id: number;
  userName: string;
  userEmail: string;
  city: string;
  announcementId: number;
}

export interface IFavorites{
  id:number;
  brand: string;
  model: string;
  price: number;
  userInfoId: number;
  announcementId: number;
}