import { Component, OnInit, ElementRef, ViewChildren} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as $ from 'jquery';
import * as moment from 'moment';
import { FourmServiceService} from 'app/Pages/testingpagetwo/service/fourm-service.service';
import {NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { Router } from '@angular/router'
import {UserService} from '../../services/user.service' 
import {SearchService } from 'app/services/search.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
   
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    user = JSON.parse(localStorage.getItem('user'))
    child : any;
    path='';
    searchControl = this.searchService.searchInput.controls;
    searchKey = this.searchControl.search.value;
    tearcherOn =false;
    studentOn = false;
    forumOn = false;
    searchBar = "search...";
    forumTypes : any;
    forumThreads : any;

    constructor(public location: Location, private element : ElementRef, private router: Router,
        private userService:UserService, public forumService : FourmServiceService,
        public searchService : SearchService) {    
        this.sidebarVisible = false;
        this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.forumService.getAll().subscribe( res=>{
            this.child = res;
          });
         
    }
    onKey( event, p : NgbPopover): void {
        console.log(event.target.value);
        console.log(p)
        if(event.target.value){
            p.open();  
        }else{
            p.close();
        }
     }
     teachers(){
         this.searchService.searchInput.reset();
         this.searchBar = "search teachers..."
         this.tearcherOn = true;
         this.forumOn = false;
         this.studentOn = false

     }
     students(){
        this.searchService.searchInput.reset();
        this.tearcherOn = false;
        this.forumOn = false;
        this.studentOn = true;
        this.searchBar = "search students...";
     }
     
     forums(user : string){
        this.searchService.searchInput.reset(); 
        this.searchBar = "search forums...";
        this.tearcherOn = false;
        this.forumOn = true;
        this.studentOn = false;

        this.searchService.getAllFormTypes().subscribe((res)=>{
            this.forumTypes = res;
        })
        this.searchService.getAllForums(user).subscribe((res)=>{
            this.forumThreads = res;
        })
     }

     gotoForum(type : string){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        this.router.navigate([type]);
     }

     gotoThread(type : string, threadId : string){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        this.router.navigate([type,threadId]);  
     }







    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    // logoutUser(){
    // this.userService.logout();
    //     this.router.navigate(['/login']);
 
    // }
}
