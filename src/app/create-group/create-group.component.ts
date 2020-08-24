import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  public groupName: any;
  public addMembers: any;
  public memberadded: Boolean;
  public usersingroup:[];
  public users:any =[];
  public userData: any;

  constructor(private appService: AppService,private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
  }

  addMember(){

    let member = {
      addMembers:this.addMembers
    }

    this.appService.findMember(member).subscribe(
      (apiResponse) => {
        
        
        if(apiResponse.status == 404){

          console.log("Error...!!");
          this.notifyService.showError("Please Enter registered username","Invalid User");

        }else {
          console.log(apiResponse);
          this.userData = {
            username: apiResponse.username
          }
          this.users.push(this.userData);
          this.memberadded = true;
          console.log(this.users);

        }



      },

      error => {

        
        console.log(error.errorMessage);
      }
    )
  }

  createGroup(){

    let data = {
      groupName: this.groupName,
      usersingroup: this.users
    }
    console.log(data.usersingroup)
    this.appService.createaGroup(data).subscribe((apiResponse) => {

      if(apiResponse.status == 200){

        console.log(apiResponse)
        this.router.navigate(['/getgroup',apiResponse.newGroup.groupId]);

      }
    })

  }

}
