import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NOTES } from '../modal/notesModal';
import { USERS } from '../modal/userModal';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  isValidUser:boolean = false;
  userId:number=0;
  username:string="";
  name:string="";
  password:string="";
  email:string="";
  userProfile:string="";
  userProfileId!:number;

  constructor(private http: HttpClient) { }

  isUserLoggedIn() {
    return this.isValidUser;
  }

  //API calls
  //notes
  getJsonNote():Observable<NOTES[]> {
    return this.http.get<NOTES[]>("http://localhost:3000/NOTES");
  }
  addJsonNote(note:any) {
    return this.http.post("http://localhost:3000/NOTES",note);
  }
  deleteJsonNote(id:number) {
    return this.http.delete("http://localhost:3000/NOTES/"+id);
  }
  updateJsonNote(note:any,id:number) {
    return this.http.put("http://localhost:3000/NOTES/"+id,note);
  }
  getMyNotes(username:string):Observable<NOTES[]> {
    return this.http.get<NOTES[]>("http://localhost:3000/NOTES?username="+username);
  }
  //user
  getUser(id:number):Observable<USERS>{
    return this.http.get<USERS>("http://localhost:3000/USER/"+id);
  }
  getUsers():Observable<USERS[]> {
    return this.http.get<USERS[]>("http://localhost:3000/USER");
  }
  addUser(user:any) {
    return this.http.post("http://localhost:3000/USER",user);
  }
  updateUser(user:any,id:number) {
    return this.http.put("http://localhost:3000/USER/"+id,user);
  }
  //for password and username
  updateuser(user:any,id:number) {
    return this.http.patch("http://localhost:3000/USER/"+id,user);
  }
  //update connection
  updateConnection(user:any,id:number){
    return this.http.patch("http://localhost:3000/USER/"+id,user);
  }
}
