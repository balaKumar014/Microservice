import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo
} from 'sequelize-typescript';
import Attribute from './attributes';

@Table
export default class AttributeValue extends Model<AttributeValue> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public ValueId!: number;

  @ForeignKey(() => Attribute)
  @Column
  public AttributeId!: number;

  @Column
  public Value!: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @BelongsTo(() => Attribute)
  public attribute!: Attribute;
}