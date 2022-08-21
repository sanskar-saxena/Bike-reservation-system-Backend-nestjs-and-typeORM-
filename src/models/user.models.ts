// Interfaces

export enum ERole {
  Regular = 'REGULAR',
  Manager = 'MANAGER',
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  id: number;
}
