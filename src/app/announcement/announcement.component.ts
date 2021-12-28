import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { IBrand, ILoginInform, IAnnouncement, IUserInfo } from '../models/interfaces';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  img!: CloudinaryImage;
  public anId: any;
  public role: any;
  public anInfoId: any;
  public currentId: any;
  public brand: any;
  public model: any;
  public canChange: boolean = false;
  public AnArray: Array<IAnnouncement> = [];
  public aArray: Array<IAnnouncement> = [];
  public userInfo: Array<IUserInfo> = [];
  public announcement: IAnnouncement= {
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
  };
  isInvalidChange: boolean = false;
  isChange: boolean = false;

  constructor(private resourceService: ResourceService,
    private router: Router) { }

  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dap6zmhqc'
      }
    }); 
    this.anId = localStorage.getItem('anid');
    this.role = localStorage.getItem('role');
    this.brand = localStorage.getItem('brand');
    this.model = localStorage.getItem('model');
    this.currentId = localStorage.getItem('currentUserInfo');
    this.anInfoId = localStorage.getItem('anUserId');
    this.resourceService.getAnnouncement(this.anId).subscribe((data: any)=>{
    this.announcement=data;
    this.img = cld.image(this.announcement.carImage);
    });
    this.resourceService.getAnnouncementArray(this.anId).subscribe((data: any)=>{
    this.AnArray = data;
    });
    this.resourceService.getUsersInfo(this.anInfoId).subscribe((data: any)=>{
    this.userInfo = data; 
    });
    if(this.role === 'admin') 
    {this.canChange = true;}
    else if(this.role === 'admin' || this.anInfoId == this.currentId){this.canChange = true}
    else {this.canChange = false}
  }

  public eventClick(event: any){
    localStorage.setItem('cloud', 'cloud');
    const file:File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e2pa0hn2");
    this.resourceService.addNewPhoto(formData).subscribe((data: any)=>{
      this.announcement.carImage = data.public_id;
      console.log(this.announcement.carImage);
    });
  }
  public ChangeAnnouncement(): void{
    const car ={
      "Id": this.anId,
      "Brand": this.announcement.brand,
      "Model": this.announcement.model,
      "CarImage": this.announcement.carImage,
      "Price": this.announcement.price,
      "CarYear": this.announcement.carYear,
      "TypeOfDriverUnit": this.announcement.typeOfDriverUnit,
      "EngineCapacity": this.announcement.engineCapacity,
      "Mileage": this.announcement.mileage,
      "AnDescription": this.announcement.anDescription,
      "UserPhone": this.announcement.userPhone,
      "UserInfoId": this.anInfoId
    }
    console.log(car);
    this.resourceService.ChangeAnnouncement(car).subscribe(()=>{
      this.isChange = true;
    },
      error => {
      if (error) {
        this.isInvalidChange = true;
      }
      }
    );
  }
  public deleteAnnouncement(): void{
    this.resourceService.deleteAnnouncement(this.anId).subscribe(()=>{
    });
    this.router.navigate(['*']);
  }

  public copyToClipBoard(unfoToClipBoard: any){
    navigator.clipboard.writeText(unfoToClipBoard);
  }
  
}
