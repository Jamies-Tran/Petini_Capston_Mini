import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../register/register.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})



export class TestComponent implements OnInit {
  name:any;
  ngOnInit(): void {
      this.name = 'dmm';
  }
  getName()
  {
    this.name;
    console.log(this.name);
  }

}


interface Food {
  value: string;
  viewValue: string;
}
