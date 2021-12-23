import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general/general.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule } from "@angular/forms";
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from '@cloudinary/ng';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeneralComponent,
    AnnouncementComponent,
    UserAccountComponent
  ],
  imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        FormsModule,
        CloudinaryModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
