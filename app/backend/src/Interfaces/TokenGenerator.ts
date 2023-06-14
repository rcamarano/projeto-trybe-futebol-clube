import { IUser } from './users/IUser';

export interface TokenGenerator {
  generate(user: IUser): string
}
