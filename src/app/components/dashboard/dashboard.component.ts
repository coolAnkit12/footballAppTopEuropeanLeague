import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input()
  topLeagueCountries: Country[];
  @Input()
  currentActiveCountry: string;
  @Output('getCountriesTeamData') getCountriesTeamData = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getCountriesTeam(country: Country) {
    this.getCountriesTeamData.emit(country);
  }
}
