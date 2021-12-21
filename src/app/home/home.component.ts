import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { IBrand, ILoginInform, IAnnouncement } from '../models/interfaces';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public brandArray: Array<IBrand> = [];
  public AnArray: Array<IAnnouncement> = [];
  public anId: any;
  public userid:any;
  public brand:any;
  public model:any;

  private dataSubscription: Subscription = new Subscription();
  
  constructor(private resourceService: ResourceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    
    this.resourceService.getBrands().subscribe((data: any)=>
    this.brandArray = data);

    this.resourceService.getAnnouncements().subscribe((data: any)=>
    this.AnArray = data);
    
  }

  public getUserBrands(brand: any): void{
    this.resourceService.getUserBrands(brand).subscribe((data: any)=>
    this.AnArray = data);
  }

  public getAllBrands(): void{
    this.resourceService.getAnnouncements().subscribe((data: any)=>
    this.AnArray = data);
  }

  public getAnnouncement(id: any, brandan:any, modelan:any): void{
    this.anId = id;
    this.brand = brandan;
    this.model = modelan;
    localStorage.setItem('anid', this.anId);
    localStorage.setItem('brand', this.brand);
    localStorage.setItem('model', this.model);
    this.router.navigate(['/announce']);
  }

}
