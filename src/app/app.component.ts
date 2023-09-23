import { Component } from '@angular/core';
import { GeneralConstant } from './constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  footballAppTitle = GeneralConstant.FOOTBALL_TITLE;
}
