import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyConnectsComponent } from './my-connects/my-connects.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { ProfileComponent } from './myProfile/profile.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes:Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'home', canActivate:[AuthGuard],component:HomeComponent},
  {path:'newnote', canActivate:[AuthGuard],component:NewNoteComponent},
  {path:'myconnects',canActivate:[AuthGuard], component:MyConnectsComponent},
  {path:'profile', canActivate:[AuthGuard],component:ProfileComponent},
  {path:'**', redirectTo:'/login', pathMatch:'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
