import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public user: string;
  public users:any=[];

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    
    this.user = this.appService.getUserInfoFromLocalStorage();
    console.log(this.user);
    this.appService.getAllGroups(this.user["username"]).subscribe((apiResponse) => {
      console.log(apiResponse);
      this.users = apiResponse;
    })

  }

  createGroup(){
    console.log("This function is called to create group");
    this.router.navigate(["/createGroup"]); 
  }

}
