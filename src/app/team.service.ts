import { Injectable } from '@angular/core';
import{ of } from 'rxjs';
import { SearchCriteria } from './SearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  getAllTeams() {
    return of(teams);
  }

  getLeagues() {
    return of(leagues);
  }

  searchTeams(searchCriteria: SearchCriteria) {
    let results = [...teams];
    if(!!searchCriteria.name) {
      results = results.filter(team => {
        return team.name.toLocaleLowerCase().includes(searchCriteria.name.toLocaleLowerCase())
      })
    }

    if(searchCriteria.leagueId) {
      results = results.filter(team => {
        return team.league.id === searchCriteria.leagueId;
      })
    }

    if(searchCriteria.gameNights.length > 0) {
      results = results.filter(team => {
        return [...team.league.gameNights].some(gameNight => searchCriteria.gameNights.includes(gameNight))
      })
    }

    if(searchCriteria.recruiting !== null) {
      results = results.filter(team => {
        return team.recruiting === searchCriteria.recruiting
      })
    }

    if(searchCriteria.coed !== null) {
      results = results.filter(team => {
        return team.league.coed === searchCriteria.coed
      })
    }

    if(searchCriteria.maxFee !== null) {
      results = results.filter(team => {
        return team.fee <= searchCriteria.maxFee;
      })
    }

    if(searchCriteria.record.length > 0) {
      console.log(searchCriteria.record.includes('L'))
      results = results.filter(team => {
        console.log(team, this.hasLosingRecord(team));
        return (searchCriteria.record.includes('W') && this.hasWinningRecord(team)) || 
          (searchCriteria.record.includes('L') && this.hasLosingRecord(team)) || 
          (searchCriteria.record.includes('U') && this.hasUndefeatedRecord(team))
      })
    }
    

    return of(results)
  }

  hasWinningRecord(team) {
    return team.record.wins > team.record.losses;
  }

  hasLosingRecord(team) {
    return team.record.wins < team.record.losses;
  }

  hasUndefeatedRecord(team) {
    return team.record.losses === 0;
  }

  gameNightsIsOneOf(nights, gameNights) {
    return [...gameNights].some(gameNight => {
      return nights.indexOf(gameNight) > -1
    })

  }

}

const leagues = [
  {id:1, name: 'SuperStars', coed: true, gameNights: 'FS'},
  {id:2, name: 'Youth Starter', coed: true, gameNights: 'MW'},
  {id:3, name: 'Adult General', coed: true, gameNights: 'H'},
  {id:4, name: 'Mens Adult', coed: false, gameNights: 'MH'}
]

const teams = [
  {id:1, name: 'Red Sox', recruiting: true, rosterSize: 14, league: leagues[0], fee: 200, positionsNeeded: ['Catcher', 'Center Field'], record: {wins: 1, losses:4}},
  {id:2, name: 'White Sox', recruiting: false, rosterSize: 16, league: leagues[0], fee: 100, positionsNeeded: [], record: {wins: 0, losses:6}},
  {id:3, name: 'Pink Sox', recruiting: true, rosterSize: 16, league: leagues[1], fee: 50, positionsNeeded: ['Center Field'], record: {wins: 5, losses:2}},
  {id:4, name: 'Marlins', recruiting: false, rosterSize: 20, league: leagues[0], fee: 100, positionsNeeded: [], record: {wins: 3, losses:3}},
  {id:5, name: 'Tryhards', recruiting: true, rosterSize: 21, league: leagues[3], fee: 0, positionsNeeded: ['First Base'], record: {wins: 2, losses:4}},
  {id:6, name: 'Baseballers', recruiting: true, rosterSize: 12, league: leagues[3], fee: 50, positionsNeeded: ['Short Stop', 'Second Base'], record: {wins: 3, losses:3}},
  {id:7, name: 'Home Stealers', recruiting: true, rosterSize: 7, league: leagues[2], fee: 50, positionsNeeded: ['Catcher', 'First Base', 'Pitcher', 'Left Field'], record: {wins: 7, losses:1}},
  {id:8, name: 'Wolverines', recruiting: true, rosterSize: 12, league: leagues[1], fee: 70, positionsNeeded: ['First Base', 'Right Field'], record: {wins: 6, losses:0}},
  {id:9, name: 'TBD', recruiting: true, rosterSize: 15, league: leagues[2], fee: 75, positionsNeeded: [], record: {wins: 2, losses:4}},
  {id:10, name: 'Penguins', recruiting: true, rosterSize: 13, league: leagues[2], fee: 0, positionsNeeded: ['Pitcher'], record: {wins: 5, losses:0}},
]