import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralConstant } from '../../assets/constant';
import { Country } from '../interfaces/country';
import { Observable } from 'rxjs';
import { Standings } from '../interfaces/standings';
import { Fixtures } from '../interfaces/fixtures';

@Injectable({
  providedIn: 'root',
})
export class FootballDataService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country> {
    return this.http.get<Country>(
      `${environment.API_HOST_URL}/teams/countries`
    );
  }

  getLeaguesId(
    countryCode: string,
    season: string,
    leagueName: string,
    countryName: string
  ): Observable<Object> {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  getStandings(leagueId: string, season: string): Observable<Standings> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<Standings>(`${environment.API_HOST_URL}/standings`, {
      params: params,
    });
  }

  getfixtures(leagueId: string, teamId: string): Observable<Fixtures> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('team', teamId)
      .set('last', GeneralConstant.TEN);
    return this.http.get<Fixtures>(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }
}
