import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
// import { FlashMessageService } from 'flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private users:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    const user={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    };

    this.users.registerUser(user).subscribe(res=>{
  
      if(res.state){
        // this.flashMessages.show("You are Registerd",{cssClass:'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      }else{
        // this.flashMessages.show("Somthing went wrong",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });

    

  }

}
