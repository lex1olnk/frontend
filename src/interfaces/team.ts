import { User } from "./user";

export interface TeamState{
  team: Team;
  description: string;
  comments: Comment;
  isLoading: boolean;
}

export interface Team{
  id: number;
  img: string;
  createdAt: string;
  updatedAt: string;
  admin: User;
  users?: User[];
}
