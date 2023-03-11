import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../register/register.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  time: Time[] = [];
  ngOnInit(): void {
    var date = new Date();
    var hour = 24;
    var minute = 60;
    var allTime = hour * minute;
    var waste = 20;

    for(let i =0; i <= allTime; ){

    }
  }
}
interface Time {
  label: string;
  value: string;
  status: boolean;
}
