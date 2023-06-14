import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SeqUserModel';

export default class UserModel {
  private model = SequelizeUser;

  async findByEmail(email:string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
  }
}
