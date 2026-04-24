import { Sequelize, DataTypes, Model } from 'sequelize';

// Using SQLite for simplicity (no external DB needed)
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

export class Todo extends Model {
  declare id: number;
  declare text: string;
  declare done: boolean;
}

Todo.init(
  {
    id:   { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.STRING,  allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: 'todos' }
);

export async function initDB() {
  await sequelize.sync({ force: false });
  console.log('✅ Database synced');
}