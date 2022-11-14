import { Component, VERSION } from '@angular/core';
import { TeamService } from './team.service';
import { SearchCriteria } from './SearchCriteria';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  results = [];
  leagues = [];
  showCriteria = true;
  searchForm: FormGroup;

  constructor(private teamService: TeamService, private fb: FormBuilder) {}

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((teams) => {
      this.results = teams;
    });
    this.teamService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
      this.leagues.unshift({ id: -1, name: 'Any' });
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      teamName: '',
      leagueId: -1,
      gameNightsMonday: false,
      gameNightsWednesday: false,
      gameNightsThursday: false,
      gameNightsfriday: false,
      gameNightsSaturday: false,
      recruiting: 'B',
      coed: 'B',
    });
  }

  onSearch() {
    let criteria = new SearchCriteria();
    let teamName = this.searchForm.value.teamName.trim();
    criteria.name = teamName === '' ? null : teamName;

    criteria.leagueId =
      this.searchForm.value.leagueId === -1
        ? null
        : this.searchForm.value.leagueId;

    criteria.gameNights = this.getGameNightsCriteria();

    criteria.recruiting = this.transalteYNBtoTFM(
      this.searchForm.value.recruiting
    );

    criteria.coed = this.transalteYNBtoTFM(this.searchForm.value.coed);

    this.teamService.searchTeams(criteria).subscribe((teams) => {
      this.results = teams;
    });
  }

  getGameNightsCriteria() {
    let gameNights = [];
    if (this.searchForm.value.gameNightsMonday) gameNights.push('M');
    if (this.searchForm.value.gameNightsWednesday) gameNights.push('W');
    if (this.searchForm.value.gameNightsThursday) gameNights.push('H');
    if (this.searchForm.value.gameNightsFriday) gameNights.push('F');
    if (this.searchForm.value.gameNightsSaturday) gameNights.push('S');
    return gameNights.join('');
  }

  transalteYNBtoTFM(value) {
    if (value === 'Y') return true;
    if (value === 'N') return false;
    if (value === 'B') return null;
  }

  toggleSearchCriteria() {
    this.showCriteria = !this.showCriteria;
  }
}
