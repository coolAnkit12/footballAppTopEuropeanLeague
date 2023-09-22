import { Component } from '@angular/core';
import { GeneralConstant } from '../assets/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = GeneralConstant.FOOTBALL_TITLE;
}
