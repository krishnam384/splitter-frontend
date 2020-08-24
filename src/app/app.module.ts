import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SplitComponent } from './split/split.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GetGroupComponent } from './get-group/get-group.component';
import { GetAllBillsComponent } from './get-all-bills/get-all-bills.component';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [
    AppComponent,
    SplitComponent,
    GroupsComponent,
    CreateGroupComponent,
    GetGroupComponent,
    GetAllBillsComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    Ng2TelInputModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login' , component: LoginComponent , pathMatch: 'full'},
      { path: '' , redirectTo: 'login' , pathMatch: 'full'},
      {path: 'split/:groupName', component: SplitComponent},
      {path: 'groups', component:GroupsComponent},
      {path: 'getgroup/:groupId', component:GetGroupComponent},
      {path:'createGroup', component:CreateGroupComponent},
      { path: "*" , component: LoginComponent},
      { path:"**", component: LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
