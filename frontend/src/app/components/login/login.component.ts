import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service' 
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  alert: boolean = false;
  hide = true;


  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.userService.loginUser(user).subscribe(res=>{
      if(res.state){
        this.userService.storeData(res.token,res.user);
        // this.flashMessages.show("You are Login",{cssClass:'alert-success', timeout:3000});
        this.router.navigate(['/home']);
      } else {
        console.log(res)
        this.alert = true;
        this.router.navigate(['/login']);
      }
    })

  }
  close(alert) {
    this.alert = false;
  }

}
