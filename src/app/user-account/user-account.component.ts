import { Component, OnInit } from '@angular/core';
import { IUserInfo, IAnnouncement } from '../models/interfaces';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public username:any;
  public userid:any;
  public userIdInfo: any;
  public imgCar: any;
  public cloud: string = "cloud";
  public userInfoArray: Array<IUserInfo> = [];
  public announcement: IAnnouncement = {
    id: 0, 
    brand: '',
    model: '',
    price: 0,
    carImage: '',
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
  public isInvalidAdd: boolean = false;
  public isInvalidAddInfo:boolean = false;
  public isInvalidDelete: boolean = false;
  public isInvalidPut: boolean = false;
  public canAddAn: boolean = false;
  


  constructor(private resourceService: ResourceService,) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.userid = localStorage.getItem('userid');
    this.userIdInfo = localStorage.getItem('currentUserInfo');

    this.useraccountpage.userId = this.userid;
    this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
      this.userInfoArray = data;
      console.log(this.userInfoArray);
      if(this.userInfoArray!=null)this.canAddAn = true;
    });      
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dap6zmhqc'
      }
    });  
  }
  
  public updateInfo(){
    this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
      this.userInfoArray = data;
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

    },
    error => {
    if (error.status) {
      this.isInvalidAddInfo = true;
    }
    });

    setTimeout(this.updateInfo, 1500);
    
  }

  public addAnnouncement(){
    const car ={
      "Brand": this.announcement.brand,
      "Model": this.announcement.model,
      "Price": this.announcement.price,
      "CarImage": this.announcement.carImage,
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
    },
    error => {
    if (error) {
      this.isInvalidAdd = true;
    }
    });
  }

  public eventClick(event: any){
    localStorage.setItem('cloud', 'cloud');
    const file:File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e2pa0hn2");
    this.resourceService.addNewPhoto(formData).subscribe((data: any)=>{
    this.announcement.carImage = data.public_id;
    });
  }

  public deleteUserInfo(id:any){
    this.resourceService.deleteUserInfo(id).subscribe(()=>{},
    error => {
      if (error) {
        this.isInvalidDelete = true;
      }
      });
      this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
        this.userInfoArray = data;
      });
  }

}
