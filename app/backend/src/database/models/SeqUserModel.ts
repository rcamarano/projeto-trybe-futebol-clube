import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SeqUserModel extends Model<InferAttributes<SeqUserModel>,
InferCreationAttributes<SeqUserModel>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<string>;
  declare role: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
}

SeqUserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    field: 'username',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(30),
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default SeqUserModel;
