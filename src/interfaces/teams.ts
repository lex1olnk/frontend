import { Team } from "./team";

export interface TeamsState{
  teams: Team[];
  searchTeams: Team[];
  isLoading: boolean;
}
