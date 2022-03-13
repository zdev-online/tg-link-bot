import { AutoIncrement, Column, DataType, Default, Model, PrimaryKey } from "sequelize-typescript";
import dayjs from "dayjs";

interface ISubs {
  id: number;
  channel_id: number;
  user_id: number;
  date: string;
}

type ISubsCreate = Omit<ISubs, 'id' | 'date'>;

export class SubsModel extends Model<ISubs, ISubsCreate> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.BIGINT)
  channel_id!: number;

  @Column(DataType.BIGINT)
  user_id!: number;

  @Default((): string => dayjs().format("DD.MM.YYYY"))
  @Column(DataType.STRING)
  date!: string;
}