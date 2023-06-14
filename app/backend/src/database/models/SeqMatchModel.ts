import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SeqTeamModel from './SeqTeamModel';

class SeqMatchModel extends Model<InferAttributes<SeqMatchModel>,
InferCreationAttributes<SeqMatchModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: CreationOptional<number>;
  declare homeTeamGoals: CreationOptional<number>;
  declare awayTeamId: CreationOptional<number>;
  declare awayTeamGoals: CreationOptional<number>;
  declare inProgress: CreationOptional<boolean>;
}

SeqMatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    field: 'home_team_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    field: 'away_team_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SeqMatchModel.belongsTo(SeqTeamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SeqMatchModel.belongsTo(SeqTeamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SeqMatchModel;
