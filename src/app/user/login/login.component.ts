import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    public router: Router,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {

    console.log("Login component is called..!!");
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  public signinFunction: any = () => {

    if (!this.email) {
      this.notifyService.showWarning("enter email", "ItSolutionStuff.com");
      //this.toastr.warning('enter email')


    } else if (!this.password) {
      this.notifyService.showWarning("enter password", "ItSolutionStuff.com");
      //this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }
      

      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {
            this.appService.setUserInfoInLocalStorage(apiResponse.resolve);

            //  Cookie.set('authtoken', apiResponse.data.authToken);
            
            //  Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
            //  Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           
            //  this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            
             this.router.navigate(['/groups']);

          } else {

            this.notifyService.showError(apiResponse.message, "ItSolutionStuff.com");
            //this.toastr.error(apiResponse.message)
          

          }

        }, (err) => {
          this.notifyService.showError("some error occured", "ItSolutionStuff.com");
          //this.toastr.error('some error occured')

        });

    } // end condition

  } // end signinFunction


}
