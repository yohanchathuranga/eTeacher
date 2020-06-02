import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {FourmServiceService } from './service/fourm-service.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-testingpagetwo',
  templateUrl: './testingpagetwo.component.html',
  styleUrls: ['./testingpagetwo.component.css']
})
export class TestingpagetwoComponent implements OnInit {
@ViewChild(MatPaginator) paginator : MatPaginator;
  //@Input() public forumThreads;
 child : any;

  constructor(private forumService: FourmServiceService) { }

  ngOnInit(): void {
   // this.getChlid
   // console.log(this.child)
  }
getChlid(event:any){
  this.child = event;
  //console.log(this.child);
  this.child.paginator = this.paginator;
}
}


