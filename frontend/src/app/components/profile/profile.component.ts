import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(res=>{
      console.log(res.user);
      let user=JSON.parse(localStorage.get('user'));
      
    })
  }

  

}
