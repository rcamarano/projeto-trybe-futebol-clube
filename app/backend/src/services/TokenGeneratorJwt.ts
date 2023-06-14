import * as jwt from 'jsonwebtoken';
import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { IUser } from '../Interfaces/users/IUser';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, this.secret); // <== aqui vai a chave secreta
    return token;
  }
}
