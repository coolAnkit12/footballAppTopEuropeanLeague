export interface Team {
  id: number;
  logo: string;
  name: string;
}

export interface ALL {
  played: string;
  win: string;
  draw: string;
  lose: String;
}

export interface Standings {
  name: string;
  logo: string;
  noOfGames: number;
  wins: number;
  losses: number;
  draws: number;
  goalDifference: number;
  points: number;
  rank: number;
  team: Team;
  all: ALL;
  goalsDiff: number;
}
