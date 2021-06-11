import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import {AngularFireAuth} from '@angular/fire/auth'
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user= new User();

  constructor(public afAuth: AngularFireAuth) { }

  async loginGoogle(){
    try{
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    catch(error){console.log(error)}
  }

  
  async loginEmail(email, password){
    try{
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    catch(error){console.log(error)}
  }

  async register(email, password){
    try{
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    catch(error){console.log(error)}
  }
  
  isAuth(){   
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  isAuthApi(){
    return 
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  setUser(user): void{
    let user_string= JSON.stringify(user);
    localStorage.setItem("currentUser",user_string);
  }

  setToken(token): void{
    localStorage.setItem("accessToken", token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(){
    let user_string = localStorage.getItem("currentUser");

    if(isNullOrUndefined(user_string)  ){
      let user= JSON.parse(user_string);
      return user;
    }
    else{
      return null;
    }
  }

  logoutUser(){
    let accessToken= localStorage.getItem("accessToken");
  }
}
