import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { Encrypter } from '../Interfaces/Encrypter';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }

    const isPasswordCorrect = await this.encrypter.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }

    const token = await this.tokenGenerator.generate(user);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
