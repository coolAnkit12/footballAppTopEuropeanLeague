import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../../services/football-data.service';
import { Country } from '../../interfaces/country';
import { Standings } from '../../interfaces/standings';
import { TopEuropeanLeagues, StandingsConst } from '../../../assets/constant';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  countriesList: Country[] = [];
  selectedCountryName: string;
  errorMessage = '';
  leagueStandingsList: Standings[] = [];
  selectedCountry: Country;
  showSpinner = false;

  readonly STANDING_CONSTANT = StandingsConst;
  currentYear: string;

  constructor(
    private footballDataService: FootballDataService,
    private utilitiesService: UtilitiesService
  ) {
    this.currentYear = new Date().getFullYear().toString();
  }

  ngOnInit(): void {
    let countries =
      JSON.parse(this.utilitiesService.getLocalStorage('countries')) || [];
    if (countries && countries.length > 0) {
      this.countriesList = countries;
      this.loadLeagueStandings();
    } else {
      this.getTopLeagueCountries();
    }
  }

  getTopLeagueCountries() {
    this.footballDataService.getCountries().subscribe((data) => {
      if (data['response'] && data['response'].length > 0) {
        this.countriesList = data['response'].filter((country) =>
          TopEuropeanLeagues.hasOwnProperty(country.name)
        );

        this.utilitiesService.setLocalStorage(
          'countries',
          JSON.stringify(this.countriesList)
        );
        this.loadLeagueStandings();
      } else {
        this.errorMessage = data['errors']?.requests;
      }
    });
  }

  loadLeagueStandings() {
    let selectedCountryItem =
      JSON.parse(this.utilitiesService.getLocalStorage('selectedCountry')) ||
      null;

    this.selectedCountry = selectedCountryItem
      ? selectedCountryItem
      : this.countriesList[0];

    this.utilitiesService.setLocalStorage(
      'selectedCountry',
      JSON.stringify(this.selectedCountry)
    );

    this.getCountriesTeamData(this.selectedCountry);
  }

  getCountriesTeamData(country: Country) {
    if (country) {
      this.selectedCountryName = country?.name;
      this.showSpinner = true;

      this.selectedCountry = country;

      this.utilitiesService.setLocalStorage(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );

      let leagueLocalId =
        JSON.parse(
          this.utilitiesService.getLocalStorage(`TopleagueId_${country.name}`)
        ) || null;

      if (leagueLocalId) {
        this.getStandings(leagueLocalId);
      } else {
        this.getLeagueId(country, leagueLocalId);
      }
    }
  }

  getLeagueId(country: Country, leagueLocalId: number) {
    let leagueName = TopEuropeanLeagues[country.name];
    this.footballDataService
      .getLeaguesId(country.code, this.currentYear, leagueName, country.name)
      .subscribe((data) => {
        if (data['response'] && data['response'].length > 0) {
          leagueLocalId = data['response'][0]?.league.id;

          this.utilitiesService.setLocalStorage(
            `TopleagueId_${country.name}`,
            JSON.stringify(leagueLocalId)
          );
          this.getStandings(leagueLocalId.toString());
        } else {
          this.errorMessage = data['errors']?.requests;
        }
      });
  }

  getStandings(leagueId: string) {
    let standingsData =
      JSON.parse(
        this.utilitiesService.getLocalStorage(
          `standings_${this.selectedCountry.name}`
        )
      ) || [];

    if (standingsData && standingsData.length > 0) {
      this.leagueStandingsList = standingsData;
      this.showSpinner = false;
    } else {
      this.footballDataService
        .getStandings(leagueId, this.currentYear)
        .subscribe((data) => {
          if (data['response'] && data['response'].length > 0) {
            this.leagueStandingsList =
              data['response'][0]?.league?.standings[0];

            this.utilitiesService.setLocalStorage(
              `standings_${this.selectedCountry.name}`,
              JSON.stringify(this.leagueStandingsList)
            );

            this.showSpinner = false;
          }
        });
    }
  }
}