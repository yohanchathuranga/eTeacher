import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { Router } from '@angular/router';
import { PasswordresetComponent } from '../passwordreset/passwordreset.component';
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
  
export class UpdatepasswordComponent implements OnInit {
  email:String;
  password: String;
  alert = false;
  constructor(private userService: UserService, private router: Router) { }
  hide= true;
  
  ngOnInit(): void {
  }

  GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sParameterName = sPageURL.split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }

  updatePassword(){
    const user = {
      email: this.GetURLParameter('email'),
      password: this.password
    }
    this.userService.updatePassword(user).subscribe(res => {
      if (res) {
        console.log(res)
        this.alert = true;
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }
}
