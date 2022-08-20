// Interfaces

export enum ERole {
  Regular = 'REGULAR',
  Manager = 'MANAGER',
}

export interface IUser {
  email: string;
  password: string;
  role: string;
  id: number;
}
