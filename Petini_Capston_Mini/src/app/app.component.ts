import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Petini_Capston_Mini';

  onActivate(event:any) {
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => window.scrollTo(0, 0), 0);
    setTimeout(() => document.documentElement.style.scrollBehavior = 'smooth', 0);
 }
}
