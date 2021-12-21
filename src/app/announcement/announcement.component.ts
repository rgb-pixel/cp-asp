import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { IBrand, ILoginInform, IAnnouncement } from '../models/interfaces';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  public anId:any;
  public role: any;
  public infoId: any;
  public brand:any;
  public model:any;
  public AnArray: Array<IAnnouncement> = [];
  public announcement: IAnnouncement= {
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
  };

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.anId = localStorage.getItem('anid');
    this.role = localStorage.getItem('role');
    this.infoId = localStorage.getItem('userAcId');
    this.brand = localStorage.getItem('brand');
    this.model = localStorage.getItem('model');
    this.resourceService.getAnnouncement(this.anId).subscribe((data: any)=>{
    this.AnArray = data;
    this.announcement = data;

   });
  }
  public ChangeAnnouncement(){
    const car ={
      "Id": this.anId,
      "Brand": this.announcement.brand,
      "Model": this.announcement.model,
      "Price": this.announcement.price,
      "CarYear": this.announcement.carYear,
      "TypeOfDriverUnit": this.announcement.typeOfDriverUnit,
      "EngineCapacity": this.announcement.engineCapacity,
      "Mileage": this.announcement.mileage,
      "AnDescription": this.announcement.anDescription,
      "UserPhone": this.announcement.userPhone,
      "UserInfoId": this.infoId
    }
    console.log(car);
    this.resourceService.ChangeAnnouncement(car).subscribe(()=>{
    });
  }
}
