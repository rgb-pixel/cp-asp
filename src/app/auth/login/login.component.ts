import { Component, OnInit } from '@angular/core';
import {ILoginInform, ISimpleUser, IUser} from "../../models/interfaces";
import {ResourceService} from "../../resource.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import { GeneralComponent } from 'src/app/general/general.component';
import { SelectMultipleControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  userId: number = 0;
  userLogin: any = "";

  public userAcId: any;
  public userloginpage: ISimpleUser = {
    username: '',
    password: '',
    role: 'user'
  }

  public isInvalidLoginOrPassword = false;
  public usernamelogin: string = '';

  constructor(
    private resourceService: ResourceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    const formData: FormData = new FormData();
    formData.append('username', this.userloginpage.username);
    formData.append('password', this.userloginpage.password);
    localStorage.setItem('user',this.userloginpage.username);

    this.resourceService.login(formData).subscribe((data: ILoginInform) => {
      this.authService.setJWTToLocalStorage(data.access_token);
        this.authService.currentRole = data.role;        
        localStorage.setItem('role', data.role);
        localStorage.setItem('userid', data.id);
        console.log(localStorage.getItem('role'));
        
        this.resourceService.GetUserInfoFromId(data.id).subscribe((data:any)=>{
          localStorage.setItem('userAcId', data);
          console.log(localStorage.getItem('userAcId'));
        }
        );
        this.router.navigate(['/*']);
        
        
        console.log(localStorage.getItem('userid')); 
        
    },
      error => {
      if (error.status == 400) {
        this.isInvalidLoginOrPassword = true;
      }
      });
  }

  public goToRegistrationPage(): void {
    this.router.navigate(['/register']);
  }
  public logout(): void {
    
    localStorage.setItem('user','');
    console.log(localStorage.getItem('user'));
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public home(): void {
    this.router.navigate(['*']);
  }

  public account(): void {
    
    this.router.navigate(['/account']);
  }
}
