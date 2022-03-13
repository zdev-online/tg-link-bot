import { AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

interface IChannel {
  id: number;
  name: string;
  link: string;
  type: 'username' | 'link';
  subs: number;
}
type IChannelCreate = Omit<IChannel, 'id' | 'subs'>

@Table({
  tableName: "link_bot_cahnnels",
  timestamps: true
})
export class ChannelsModel extends Model<IChannel, IChannelCreate> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  link!: string;

  @Column(DataType.STRING)
  type!: 'username' | 'link'

  @Default(0)
  @Column(DataType.BIGINT)
  subs!: number
}