import { Component, OnInit } from '@angular/core';
import { IUserInfo, IAnnouncement } from '../models/interfaces';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public username:any;
  public userid:any;
  public userIdInfo: any;
  public userInfoArray: Array<IUserInfo> = [];
  public announcement: IAnnouncement = {
    id: 0, 
    brand: '',
    model: '',
    price: 0,
    carYear: 0,
    typeOfDriverUnit: '',
    engineCapacity: 0,
    mileage: 0,
    anDescription: '',
    userPhone: '',
    userInfoId: 0
  }
  public useraccountpage: IUserInfo = {
    Id: 0, 
    userName: '',
    userEmail: '',
    city: '',
    userId: 0
  }
  constructor(private resourceService: ResourceService,) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.userid = localStorage.getItem('userid');
    this.userIdInfo = localStorage.getItem('userAcId');

    this.useraccountpage.userId = this.userid;
    this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
      this.userInfoArray = data
    });        
  }
  
  public addInfo(){
    
    const user = {
      "UserName": this.useraccountpage.userName,
      "UserEmail": this.useraccountpage.userEmail,
      "City": this.useraccountpage.city,
      "UserId": this.userid
    }
    
    console.log(user);
    this.resourceService.addNewUserInfo(user).subscribe(()=>{

    });
    this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
      this.userInfoArray = data
    });
  }
  public addAnnouncement(){
    const car ={
      "Brand": this.announcement.brand,
      "Model": this.announcement.model,
      "Price": this.announcement.price,
      "CarYear": this.announcement.carYear,
      "TypeOfDriverUnit": this.announcement.typeOfDriverUnit,
      "EngineCapacity": this.announcement.engineCapacity,
      "Mileage": this.announcement.mileage,
      "AnDescription": this.announcement.anDescription,
      "UserPhone": this.announcement.userPhone,
      "UserInfoId": this.userIdInfo
    }
    console.log(car);
    this.resourceService.addNewAnnouncement(car).subscribe(()=>{
    });
  }
}
