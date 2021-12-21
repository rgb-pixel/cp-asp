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
  carYear: number;
  typeOfDriverUnit: string;
  engineCapacity: number;
  mileage: number;
  anDescription: string;
  userPhone: string;
  userInfoId?: number
}

export interface IBrand{
  brand:string;
}