import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit {


  public amount: any;
  public name: any;
  public persons: any;
  public result: any;
  public calculated_Bill: Boolean;
  constructor(
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {

    console.log("Split component is called..!!");
  }


  public calculateBill: any = () => {

    if (!this.amount) {
      this.notifyService.showWarning("enter email", "ItSolutionStuff.com");
      //this.toastr.warning('enter email')


    } else if (!this.name) {
      this.notifyService.showWarning("enter password", "ItSolutionStuff.com");
      //this.toastr.warning('enter password')


    }else if (!this.persons) {
      this.notifyService.showWarning("enter password", "ItSolutionStuff.com");
      //this.toastr.warning('enter password')


    }  
    else {

      let data = {
        amount: this.amount,
        name: this.name,
        persons: this.persons
      }

      this.calculated_Bill = true;

      console.log(`Amount is ${data.amount}<br />Paid by: ${data.name}<br />Total No.of Persons: ${data.persons}`);

      this.result = data.amount/data.persons;
      
      console.log(`Others Must pay ${this.result} to ${data.name} `);



    }
  }



}
