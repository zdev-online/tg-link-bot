import { AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

interface IUser {
  id: number;
  tg_id: number;
  nickname: string;
  username?: string;
  isActive: boolean;
  referal_code: string;
  can_create_link: boolean;
}

type IUserCreate = Omit<IUser, 'id' | 'isActive' | 'referal_code'>;

@Table({
  tableName: 'porn_bot_users'
})
export class UsersModel extends Model<IUser, IUserCreate> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.BIGINT)
  tg_id!: number;

  @Column(DataType.STRING)
  nickname!: string;

  @Column(DataType.STRING)
  username?: string

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  can_create_link!: boolean; 

  @Column(DataType.STRING)
  referal_code?: string;
}