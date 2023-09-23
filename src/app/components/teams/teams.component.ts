import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballService } from '../../services/football.service';
import { Fixtures } from '../../interfaces/fixtures';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  fixtures: Fixtures[];
  loading: boolean;
  errorMessage: string = '';
  teamId: string;

  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.teamId = params['teamId'];
    });

    let selectedCountry = JSON.parse(
      this.utilitiesService.getLocalStorage('selectedCountry')
    );

    let leagueId =
      JSON.parse(
        this.utilitiesService.getLocalStorage(
          `TopleagueId_${selectedCountry.name}`
        )
      ) || null;

    if (leagueId) {
      this.footballService
        .getfixtures(leagueId, this.teamId)
        .subscribe((data) => {
          this.loading = false;
          this.fixtures = data['response'];
        });
    }
  }
}
