import { Component, VERSION } from '@angular/core';
import { TeamService } from './team.service';
import { SearchCriteria } from './SearchCriteria';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  results = [];
  leagues = [];
  showCriteria = true;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((teams) => {
      this.results = teams;
    });
    this.teamService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
      this.leagues.unshift({ id: -1, name: 'Any' });
    });
  }

  toggleSearchCriteria() {
    this.showCriteria = !this.showCriteria;
  }
}
