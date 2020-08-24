import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-group',
  templateUrl: './get-group.component.html',
  styleUrls: ['./get-group.component.css']
})
export class GetGroupComponent implements OnInit {

  public groupId: string;
  public groupName: string;
  public users: [];
  public billName: string;
  public inputAmount: string;
  public paidPerson: string;
  public singleBillAmount:any= [];
  public amountPaid: any=0;
  public getsBack:Number=0;
  public NeedToPay:Number=0;
  public isPaid:Boolean;
  public billData:any=[];
  public allBills:any=[];
  public message: string;

  constructor(private appService: AppService, private _route: ActivatedRoute, private router: Router) { 

    this.groupId = this._route.snapshot.paramMap.get('groupId');
    this.appService.getGroup(this.groupId).subscribe(
      (apiResponse) => {
          console.log(apiResponse);
          this.groupName = apiResponse.groupName;
          this.users = apiResponse.usersingroup;
          console.log(this.users);
          for(let i=0;i<this.users.length;i++){
            var x = 0;
            this.singleBillAmount.push(x)
          }
          
      })
    console.log(this.groupId);
  }

  ngOnInit() {

    console.log("Get group oninit is called");

    this.appService.getBills(this.groupId).subscribe((apiResponse) => {
      console.log("Inside getBills");
      console.log(apiResponse.status);
      if(apiResponse.status === 200){
        console.log(apiResponse);
        this.allBills=[...apiResponse.result];
        console.log(this.allBills);
        console.log("Here are the bills"+ this.allBills);
      }else if(apiResponse.status === 404){
        this.message = apiResponse.message;
        console.log(this.message);
      } 
    })


  }


  calculateBill(){
    console.log(this.billName);
    console.log(this.singleBillAmount);
    console.log(this.paidPerson);
    const amountPerUser = (parseFloat(this.inputAmount)/this.users.length).toFixed(2);
    console.log(`${this.paidPerson} will get INR ${amountPerUser} from others`);

    for(let i=0;i<this.users.length;i++){
      this.isPaid = false;
      console.log(this.users[i]["username"])
      if(this.users[i]["username"]==this.paidPerson){
          this.isPaid= true;
          this.amountPaid = parseFloat(this.inputAmount);
          this.getsBack = parseFloat((this.amountPaid-parseFloat(amountPerUser)).toFixed(2));
          this.NeedToPay = 0;
      }else {
        this.isPaid= false;
        this.amountPaid = 0;
        this.getsBack = 0;
        this.NeedToPay = parseFloat(amountPerUser);
        
      }

      let testData = {
        name: this.users[i]["username"],
        isPaid: this.isPaid,
        amountPaid: this.amountPaid,
        getsBack: this.getsBack,
        needToPay: this.NeedToPay
      }

      this.billData.push(testData);

    }

    console.log(this.billData);

    let totalData = {
      billName: this.billName,
      groupId: this.groupId,
      data: this.billData
    }
    this.appService.createBill(totalData).subscribe((apiResponse) => {
      console.log(apiResponse);


      this.appService.getBills(this.groupId).subscribe((apiResponse) => {
        console.log("Inside getBills");
        console.log(apiResponse.status);
        if(apiResponse.status === 200){
          console.log(apiResponse);
          this.allBills=[...apiResponse.result];
          console.log(this.allBills);
          console.log("Here are the bills"+ this.allBills);
        }else if(apiResponse.status === 404){
          this.message = apiResponse.message;
          console.log(this.message);
        } 
      })
    })



    

  }



}
