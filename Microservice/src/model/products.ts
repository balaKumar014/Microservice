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
  import ProductAttribute from './productAttributes';
  
  @Table
  export default class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public ProductId!: number;
  
    @Column
    public Name!: string;
  
    @Column(DataType.TEXT)
    public Description!: string;
  
    @Column(DataType.DECIMAL(10, 2))
    public BasePrice!: number;
  
    @Column
    public ImageURL!: string;
  
    @CreatedAt
    public createdAt!: Date;
  
    @UpdatedAt
    public updatedAt!: Date;
  
    @HasMany(() => ProductAttribute)
    public productAttributes!: ProductAttribute[];
  }