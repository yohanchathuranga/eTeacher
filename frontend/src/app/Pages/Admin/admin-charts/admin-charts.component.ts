import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { AdminService } from '../../../services/admin.service'

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {

  avaUsers : any;
  delUsers : any;
  avaForums : any;
  delForums : any;
  dataArr : any = [];
  forum : any;
  forumTypes : any = [0,0,0,0,0];
  booking : any;
  bookingTypes : any = [0,0];
  complain : any;
  complainTypes : any = [0,0];
  option : String = "doughnut";
  myChart : any;

  constructor(private admin : AdminService) { 
  }

  ngOnInit(): void {
    this.admin.getAllForums().subscribe(result=>{
      this.forum = result;
      this.getTheForums(this.forum);
      // console.log(this.forum[0]["type"])
      // this.printData();
      
    })
    this.admin.getAllBookings().subscribe(result=>{
      this.booking = result;
      // console.log(this.booking)
      this.getTheBookings(this.booking);
      this.printData();
    })
    this.admin.getAllComplains().subscribe(result=>{
      this.complain = result;
      // console.log(this.complain)
      // this.getTheComplains(this.complain);
      // this.printData();
      this.getTheComplains(this.complain)
    })
    // this.admin.getDelComplains().subscribe(result=>{
    //   this.complain = result;
    //   // console.log(this.complain)
    //   // this.getTheComplains(this.complain);
    //   // this.printData();
    //   this.getTheComplains(1,this.complain)
    // })

  }

  // changeTheOption(option){
  //   this.myChart.chart.clear()
  //   this.option = option;
  //   this.printData();
  // }

  getTheForums(forums){
    // console.log(forums)
    for(var i = 0; i < forums.length; i++){
      if(forums[i]["type"] == "Physics"){
        this.forumTypes[0] += 1
      }
      if(forums[i]["type"] == "Maths"){
        this.forumTypes[1] += 1
      }
      if(forums[i]["type"] == "Health"){
        this.forumTypes[2] += 1
      }
      if(forums[i]["type"] == "Computer Science"){
        this.forumTypes[3] += 1
      }
      if(forums[i]["type"] != "Physics" && forums[i]["type"] != "Maths" && forums[i]["type"] != "Health" && forums[i]["type"] != "Computer Science") {
        this.forumTypes[4] += 1
      }
    }
    // console.log(this.forumTypes)
  }

  getTheBookings(bookings){
    // console.log(bookings)
    for(var i = 0; i < bookings.length; i++){
      if(bookings[i]["status"] == "pending"){
        this.bookingTypes[0] += 1
      }
      if(bookings[i]["status"] == "confirm"){
        this.bookingTypes[1] += 1
      }
    }
    // console.log(this.bookingTypes)
  }

  getTheComplains(complains){
    // console.log(bookings)
    for(var i = 0; i < complains.length; i++){
      if(complains[i]["type"] == "Teacher"){
        this.complainTypes[0] += 1
      }
      if(complains[i]["type"] == "Student"){
        this.complainTypes[1] += 1
      }
    }
    // this.complainTypes[index]= complains.length;
    console.log(this.complainTypes)
  }

  printData(){
      this.admin.getUsersAdmin().subscribe(result=> {
        this.avaUsers = result;
        this.printFunction(0,this.avaUsers.length)
        },
        err => {
          console.log(err);
        }
      )
      this.admin.getDeletedUsersAdmin().subscribe(result=>{
        this.delUsers = result;
        this.printFunction(1,this.delUsers.length)
        },
        err => {
          console.log(err);
        }
      )
      this.admin.getAllForums().subscribe(result=>{
        this.avaForums = result;
        this.printFunction(2,this.avaForums.length)
        },
        err => {
          console.log(err);
        }
      )
      this.admin.getDelForums().subscribe(result=>{
        this.delForums = result;
        this.printFunction(3,this.delForums.length)
        },
        err => {
          console.log(err);
        }
      )
  }

  printTheChart(){

      this.myChart = new Chart("myCanvas", {
        type: this.option,
        data: {
            labels: ['Available Users', 'Deleted Users'],
            datasets: [
              {
                label: 'Users in the system',
                data : [this.dataArr[0], this.dataArr[1]],
                backgroundColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
                borderColor: [
                  'rgba(255, 255, 255, 1)',
                  'rgba(255, 255, 255, 1)',
                ],
                  borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          rotation: (0.5 * Math.PI) - (95/180 * Math.PI),
        }
      });
      
      var myChart2 = new Chart("myCanvas2", {
        type: this.option,
        data: {
            labels: ['Available Forums', 'Deleted Forums'],
            datasets: [
              {
                label: 'Forums in the system',
                data: [this.dataArr[2], this.dataArr[3]],
                backgroundColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
              ],
              borderColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              ],
                borderWidth: 3
            }
          ]
        },
        options: {
          rotation: (0.5 * Math.PI) - (95/180 * Math.PI),
          responsive: true,
        }
      });

      var myChart3 = new Chart("myCanvas3", {
        type: this.option,
        data: {
            labels: ['Physics', 'Maths', 'Health', 'Computer Science', 'Other'],
            datasets: [
              {
                label: 'Forum Types in the system',
                data: this.forumTypes,
                backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
            ],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
        }
      });

      var myChart4 = new Chart("myCanvas4", {
        type: this.option,
        data: {
            labels: ['Pending', 'Confirmed'],
            datasets: [
              {
                label: 'Booking status in the system',
                data: this.bookingTypes,
                backgroundColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(75, 192, 192,1)',
              ],
                borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ],
                borderWidth: 3
            }
          ]
        },
        options: {
          rotation: (0.5 * Math.PI) - (95/180 * Math.PI),
          responsive: true,
        }
    });

    var myChart5 = new Chart("myCanvas5", {
      type: this.option,
      data: {
          labels: ['Complains by available teachers', 'Complains by available students'],
          datasets: [
            {
              label: 'Booking status in the system',
              data: this.complainTypes,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
            ],
              borderWidth: 3
          }
        ]
      },
      options: {
        rotation: (0.5 * Math.PI) - (95/180 * Math.PI),
        responsive: true,
      }
  });
  }

  printFunction(index,count){
    this.dataArr[index] = count
    // console.log(this.dataArr)
    this.printTheChart()
  }
}
