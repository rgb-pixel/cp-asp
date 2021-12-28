import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { IBrand, ILoginInform, IAnnouncement } from '../models/interfaces';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  img!: CloudinaryImage;
  public brandArray: Array<IBrand> = [];
  public AnArray: Array<IAnnouncement> = [];
  public myArray: Array<IAnnouncement> = [];
  public anId: any;
  public userid:any;
  public brand:any;
  public model:any;
  public anInfoId: any;
  public myAnId: any;
  public myAnnouncement: boolean = false;


  
  constructor(private resourceService: ResourceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dap6zmhqc'
      }
    }); 
    this.userid = localStorage.getItem('userid');
    this.myAnId = localStorage.getItem('currentUserInfo');
    
    this.resourceService.getBrands().subscribe((data: any)=>
    this.brandArray = data);

    this.resourceService.getAnnouncements().subscribe((data: any)=>
    this.AnArray = data);
    
    this.resourceService.GetUserInfoFromId(this.userid).subscribe((data: any)=>{            
      localStorage.setItem('currentUserInfo', data);
    }); 
  }

  public getUserBrands(brand: any): void{
    this.resourceService.getUserBrands(brand).subscribe((data: any)=>
    this.AnArray = data);
    this.myAnnouncement = false;
  }

  public getAllBrands(): void{
    this.resourceService.getAnnouncements().subscribe((data: any)=>
    this.AnArray = data);
    this.myAnnouncement = false;
  }

  public getAnnouncement(id: any, brandan:any, modelan:any, aninfoid:any): void{
    this.anId = id;
    this.brand = brandan;
    this.model = modelan;
    this.anInfoId = aninfoid;

    console.log("brand: "+ this.brand + " model: " + this.model);
    
    localStorage.setItem('anid', this.anId);
    localStorage.setItem('brand', this.brand);
    localStorage.setItem('model', this.model);
    localStorage.setItem('anUserId', this.anInfoId);

    console.log("brand: "+ localStorage.getItem('brand') + " model: " + localStorage.getItem('model'));
    this.router.navigate(['/announce']);
  }

  public getMyAnnouncements(){
    this.myAnId = localStorage.getItem('currentUserInfo');
    this.myAnnouncement = true;
    this.resourceService.getMyAnnouncements(this.myAnId).subscribe((data: any)=>
    this.myArray = data);
    
  }

}
