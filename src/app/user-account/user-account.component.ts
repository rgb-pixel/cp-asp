import { Component, OnInit } from '@angular/core';
import { IUserInfo, IAnnouncement, IFavorites } from '../models/interfaces';
import { Router } from '@angular/router';
import { ResourceService } from '../resource.service';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { sonnet } from '@cloudinary/url-gen/qualifiers/artisticFilter';



@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public anId: any;
  public brand:any;
  public model:any;
  public anInfoId: any;
  public username:any;
  public userid:any;
  public userIdInfo: any;
  public imgCar: any;
  public cloud: string = "cloud";
  public userInfoArray: Array<IUserInfo> = [];
  public favoritesArray: Array<IFavorites> = [];
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
    announcementStatus: 'activ',
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
  public isErrorAddNew: boolean = false;
  public isAddNew: boolean = false;
  public canSeeFavorite: boolean = false;

  constructor(private resourceService: ResourceService,
    private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.userid = localStorage.getItem('userid');
    this.resourceService.GetUserInfoFromId(this.userid).subscribe((data: any)=>{            
      localStorage.setItem('currentUserInfo', data);
    }); 

    this.useraccountpage.userId = this.userid;
    this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
      this.userInfoArray = data;
      console.log(this.userInfoArray);
      if(this.userInfoArray!=null){
        this.canAddAn = true;
        this.canSeeFavorite = true;
      }
    });      
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dap6zmhqc'
      }
    });  
    this.userIdInfo = localStorage.getItem('currentUserInfo');

    this.resourceService.getFavorites(this.userIdInfo).subscribe((data:any)=>{
      console.log(data);
      this.favoritesArray = data;
      console.log(this.favoritesArray);
    });

    
  }
  

    
  
  public addInfo(){
    this.userIdInfo = localStorage.getItem('currentUserInfo');
    const user = {
      "UserName": this.useraccountpage.userName,
      "UserEmail": this.useraccountpage.userEmail,
      "City": this.useraccountpage.city,
      "UserId": this.userid
    }
    
    console.log(user);
    this.resourceService.addNewUserInfo(user).subscribe(()=>{},
    error => {
    if (error.status) {
      this.isInvalidAddInfo = true;
      
    }
    });

    setTimeout(() =>
      {
        this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{
          this.userInfoArray = data;
          this.canAddAn = true;
          this.canSeeFavorite = true;
        },error => {
          if (error) {
            this.userInfoArray = [];
            this.canAddAn = false;
            this.canSeeFavorite = false;
          }
          });
      }, 2000);

      setTimeout(() =>
      {
        this.resourceService.GetUserInfoFromId(this.userid).subscribe((data: any)=>{            
          localStorage.setItem('currentUserInfo', data);
        }); 
      }, 1500);

      
  }

  public addAnnouncement(){
    this.userIdInfo = localStorage.getItem('currentUserInfo');
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
      "AnnouncementStatus": this.announcement.announcementStatus,
      "UserInfoId": this.userIdInfo
    }
 
    console.log(car);
    this.resourceService.addNewAnnouncement(car).subscribe(()=>{
      this.isAddNew = true;
    },
    error => {
    if (error) {
      this.isInvalidAdd = true;
      this.isErrorAddNew = true;
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

  public deleteUserInfo(){
    this.userIdInfo = localStorage.getItem('currentUserInfo');
    this.resourceService.deleteUserInfo(this.userIdInfo).subscribe(()=>{},
    error => {
      if (error) {
        this.isInvalidDelete = true;
      }
      });
      setTimeout(() =>
      {
        this.resourceService.getUserInfo(this.userid).subscribe((data: any)=>{},error => {
          if (error) {
            this.userInfoArray = [];
            this.canAddAn = false;
            this.canSeeFavorite = false;
          }
          });
      }, 1500);

  }
  public getAnnouncement(brandan:any, modelan:any): void{
    // this.anId = this.favoritesArray;
    this.brand = brandan;
    this.model = modelan;
    // this.anInfoId = aninfoid;

    // localStorage.setItem('anid', this.anId);
    localStorage.setItem('brand', this.brand);
    localStorage.setItem('model', this.model);
    // localStorage.setItem('anUserId', this.anInfoId);
    this.router.navigate(['/announce']);
  }
}
