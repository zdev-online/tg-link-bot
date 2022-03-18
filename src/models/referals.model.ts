import dayjs from "dayjs";
import { AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

interface IReferalsModel {
  id: number;
  user_id: number;
  from_id: number;
  date: string;
}
type IReferalsModelCreate = Omit<IReferalsModel, 'id' | 'date'>

@Table({
  tableName: 'porn_bot_referals'
})
export class ReferalsModel extends Model<IReferalsModel, IReferalsModelCreate> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.BIGINT)
  user_id!: number;

  @Column(DataType.BIGINT)
  from_id!: number;

  @Default(() => dayjs().format("HH:mm:ss, DD.MM.YYYY"))
  @Column(DataType.STRING)
  date!: string;
}