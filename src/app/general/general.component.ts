import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Subscription } from "rxjs";
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  userId: number = 0;
  userLogin: any = "";
  
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private resourceService: ResourceService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userLogin = localStorage.getItem('user');
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.setItem('user','')
  }

  public home(): void {
    this.router.navigate(['**']);
  }

  public account(): void {
    
    this.router.navigate(['/account']);
  }
}
