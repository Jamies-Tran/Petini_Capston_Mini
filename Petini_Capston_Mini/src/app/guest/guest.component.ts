import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit{
  onActivate(event:any) {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => window.scrollTo(0, 0), 0);
    setTimeout(() => document.documentElement.style.scrollBehavior = 'smooth', 0);
 }


 isLogin= false;
 logined="";
 updateData(item:any){
  console.warn(item);
  this.logined=item;
  console.log(item);
 }


 ngOnInit(): void {
  console.log(this.isLogin);
     if(localStorage.getItem('userToken')){
      this.isLogin = true;
      console.log(this.isLogin);
      console.log(localStorage.getItem('userToken'));
     }else{
      this.isLogin=false;
     }
     this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('roles');
 }


 avatarUrl : any;
 username: any ;
 role:any
 constructor(
  private router: Router,private route: ActivatedRoute,
 ){
  if(localStorage.getItem('userToken')){
    this.isLogin = true;
    console.log(this.isLogin);
    console.log(localStorage.getItem('userToken'));
   }else{
    this.isLogin=false;
   }

 }

 logout(){
  localStorage.clear();
  this.isLogin=false;
    this.router.navigate(['Login'], {relativeTo: this.route});
 }


}
