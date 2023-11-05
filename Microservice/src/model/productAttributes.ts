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
import Product from './products';
import AttributeValue from './attributeValues';

@Table
export default class ProductAttribute extends Model<ProductAttribute> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public ProdAttrId!: number;

  @ForeignKey(() => Product)
  @Column
  public ProductId!: number;

  @ForeignKey(() => AttributeValue)
  @Column
  public ValueId!: number;

  @CreatedAt
  public createdAt!: Date;

  @UpdatedAt
  public updatedAt!: Date;

  @BelongsTo(() => Product)
  public product!: Product;

  @BelongsTo(() => AttributeValue)
  public attributeValue!: AttributeValue;
}