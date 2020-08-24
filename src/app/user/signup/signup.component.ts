import { Component, OnInit, ɵConsole, Input, Testability } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public username: any;
  public phone: any;
  public email: any;
  public password: any;
  public countries: any=[];
  public selectedCountry: string;
  public phoneCode: string;
  public countiresCodeData: object;
  constructor(
    public appService: AppService,
    public router: Router,
    private notifyService : NotificationService,
    public http: HttpClient
  ) { }

  ngOnInit(): void {

    console.log("Signup component is called..!!")
    


    this.appService.getCountryCode().subscribe((apiResponse => {
      console.log(apiResponse);
      this.countiresCodeData=apiResponse;
      for (let [key, value] of Object.entries(apiResponse)) {
        this.countries.push(key);
       
      }
    
    }))
  }


  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

 



  public signupFunction: any = () => {

    if (!this.username) {
      this.notifyService.showWarning("enter Username", "ItSolutionStuff.com")
      //this.toastr.warning('enter first name')

    } else if (!this.phone) {
      this.notifyService.showWarning("enter mobile", "ItSolutionStuff.com")
     // this.toastr.warning('enter mobile')

    } else if (!this.email) {
      this.notifyService.showWarning("enter email", "ItSolutionStuff.com")
      //this.toastr.warning('enter email')

    } else if (!this.password) {
      this.notifyService.showWarning("enter password", "ItSolutionStuff.com")
      //this.toastr.warning('enter password')
     

    } else {

      let data = {
        username: this.username,
        phone: this.phone,
        email: this.email,
        password: this.password
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.notifyService.showSuccess("Signed up successfully !!", "ItSolutionStuff.com");

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.notifyService.showError(apiResponse.message, "ItSolutionStuff.com");
            //this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.notifyService.showError("some error occured", "ItSolutionStuff.com");
          //this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction


}
