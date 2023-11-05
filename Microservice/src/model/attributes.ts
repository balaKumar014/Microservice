import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import AttributeValue from './attributeValues';

@Table
export default class Attribute extends Model<Attribute> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public AttributeId!: number;

  @Column
  public Name!: string;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @HasMany(() => AttributeValue)
  public attributeValues!: AttributeValue[];
}