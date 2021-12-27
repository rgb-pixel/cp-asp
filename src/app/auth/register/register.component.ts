import { Component, OnInit } from '@angular/core';
import {ISimpleUser} from "../../models/interfaces";
import {ResourceService} from "../../resource.service";
import { Router} from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  userId: number = 0;
  userLogin: any = "";
  public errorMessage = '';
  public userCredentials: ISimpleUser = {
    username: '',
    password: '',
    role: 'admin'
  }

  constructor(
    private resourceService: ResourceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    const formData: FormData = new FormData();
    formData.append('login', this.userCredentials.username);
    formData.append('password', this.userCredentials.password);
    formData.append('role', this.userCredentials.role);
    this.resourceService.addNewUser(formData).subscribe((data: ISimpleUser) => {
      this.router.navigate(['/login']);
    },
      error => {
        this.errorMessage = error.error;
      });
  }

  public goToLoginPage(): void {
    this.router.navigate(['/login']);
  }
  public logout(): void {
    
    localStorage.setItem('user','');
    console.log(localStorage.getItem('user'));
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public home(): void {
    this.router.navigate(['**']);
  }

  public account(): void {
    
    this.router.navigate(['/account']);
  }
}
