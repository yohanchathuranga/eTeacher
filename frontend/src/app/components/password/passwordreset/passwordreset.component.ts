import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  email: String;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  resetPassword() {
      const user = {
        email: this.email,
      }
      this.userService.resetPassword(user).subscribe(res => {
        if (res.state) {
         
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      })
  }

}
