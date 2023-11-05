import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from "../../helper/logger";
import Utils from '../../helper/utils';
import Product from '../../model/products';
import * as _ from 'lodash';
import Attribute from '../../model/attributes';
import ProductAttribute from '../../model/productAttributes';
import AttributeValue from '../../model/attributeValues';
import sequelize from '../../config/sequelize-connection';
import { QueryTypes } from 'sequelize';
export default class Repository {
    public query: any;
    constructor() { }

    public addProduct(token: string, payload: any): Promise<any[]> {
        return new Promise(async (resolver: any, rejecter: any) => {
            try {
                const tokenData: any = await Utils.validateToken(token);
                let productDetails: any = [{ Name: payload.name, BasePrice: payload.price, Description: payload.description, ImageURL: payload.image }];
                const chekProductExsist: any = await Product.findAll({ where: { Name: payload.name }, attributes: ['Name', "ProductId"], raw: true });
                if (chekProductExsist.length) productDetails[0].ProductId = chekProductExsist[0].ProductId;
                else productDetails[0].ProductId = await Utils.generateRandomBigIntId();
                const chunkProductDetails: any = _.chunk(productDetails, 1000);
                const response: any = await Product.bulkCreate(chunkProductDetails[0], { updateOnDuplicate: ["BasePrice", "Description", "ImageURL", "updatedAt"] });
                const attributes: any = Object.keys(payload.otherAttributes);
                let attributesList: any = await Attribute.findAll({ where: { Name: attributes }, attributes: ['AttributeId', 'Name'], raw: true });
                let exsistingAttributeIds: any = attributesList.map((item: any) => item.AttributeId);
                let attributeValues: any = await AttributeValue.findAll({ where: { AttributeId: exsistingAttributeIds }, attributes: ['ValueId', 'AttributeId', 'Value'], raw: true });
                let exsistingAttributes: any = attributesList.map((item: any) => item.Name);
                if (attributesList.length !== attributes.length) {
                    let newAttributes: any = attributes.filter((item: any) => !exsistingAttributes.includes(item));
                    let newAttributesList: any = [];
                    for (let i = 0; i < newAttributes.length; i++) {
                        newAttributesList.push({ Name: newAttributes[i], AttributeId: await Utils.generateRandomBigIntId() });
                    }
                    attributesList = [...attributesList, ...newAttributesList];
                    const chunkAttributesList: any = _.chunk(attributesList, 1000);
                    await Attribute.bulkCreate(chunkAttributesList[0], { updateOnDuplicate: ["Name", "updatedAt"] });
                }
                for (const key in payload.otherAttributes) {
                    const filterAttribute: any = attributesList.filter((item: any) => item.Name == key);
                    const filterAttributeValue: any = attributeValues.filter((item: any) => item.AttributeId == filterAttribute[0].AttributeId);
                    if (!filterAttributeValue.length) attributeValues.push({ ValueId: await Utils.generateRandomBigIntId(), AttributeId: filterAttribute[0].AttributeId, Value: payload.otherAttributes[key] });
                }
                const chunkAttributeValues: any = _.chunk(attributeValues, 1000);
                await AttributeValue.bulkCreate(chunkAttributeValues[0], { updateOnDuplicate: ["updatedAt"] });
                const attributeValueIds = _.map(attributeValues, 'ValueId');
                const productAttributesList: any = await ProductAttribute.findAll({ where: { ProductId: productDetails[0].ProductId, ValueId: attributeValueIds }, attributes: ['ProductId', 'ValueId', "ProdAttrId"], raw: true });
                const productAttributeListIds = _.map(productAttributesList, 'ProdAttrId');
                if (productAttributeListIds.length != attributeValueIds.length) {
                    const filterProductAttributes: any = attributeValueIds.filter((item: any) => !productAttributeListIds.includes(item));
                    let newProductAttributesList: any = [];
                    for (let i = 0; i < filterProductAttributes.length; i++) {
                        newProductAttributesList.push({ ProductId: productDetails[0].ProductId, ValueId: filterProductAttributes[i], ProdAttrId: await Utils.generateRandomBigIntId() });
                    };
                    const chunkProductAttributesList: any = _.chunk(newProductAttributesList, 1000);
                    await ProductAttribute.bulkCreate(chunkProductAttributesList[0], { updateOnDuplicate: ["updatedAt"] });
                }
                return resolver({ success: true, message: "Product added successfully" });
            } catch (error) {
                logger.info("ERROR", error)
                rejecter({ success: false, message: error });
            }
        })
    }

    public listProduct(token: string, payload: any): Promise<any[]> {
        return new Promise(async (resolver: any, rejecter: any) => {
            try {
                const tokenData: any = await Utils.validateToken(token);
                let conditions = ``;
                if (payload.filters) {
                    if (payload.filters.attributeNames) conditions += ` and a.Name IN (:attributeNames)`;
                    if (payload.filters.attributeValues) conditions += ` and av.Value IN (:attributeValues)`;
                };
                if (payload.attributeName) conditions += ` and a.Name = :attributeName`;  // search will work based on the produt name only

                let baseQuery: any = `SELECT 
                                            p.ProductId,
                                            p.Name,
                                            p.Description,
                                            p.BasePrice,
                                            p.ImageURL,
                                            p.createdAt AS ProductCreatedAt,
                                            p.updatedAt AS ProductUpdatedAt,
                                            pa.ProdAttrId,
                                            a.AttributeId,
                                            a.Name as AttributeName,
                                            av.ValueId,
                                            av.Value,
                                            av.createdAt AS AttributeValueCreatedAt,
                                            av.updatedAt AS AttributeValueUpdatedAt
                                        FROM 
                                            Products p
                                        LEFT JOIN ProductAttributes pa ON p.ProductId = pa.ProductId
                                        LEFT JOIN AttributeValues av ON pa.ValueId = av.ValueId
                                        LEFT JOIN Attributes a ON av.AttributeId = a.AttributeId
                                        where p.ProductId = p.ProductId ${conditions} 
                                        LIMIT :limit
                                        OFFSET :offset
                                        `;
                if (payload.sortBy && payload.sortOrder) baseQuery += ` ORDER BY :sortBy :sortOrder`;
                const reponse = await sequelize.query(baseQuery, { replacements: { sortBy: payload.sortBy, sortOrder: payload.sortOrder, limit: payload.limit ? payload.limit : 10, offset: payload.offset ? payload.offset : 0, attributeName: payload.attributeName, attributeNames: payload.filters ? payload.filters.attributeNames : null, attributeValues: payload.filters ? payload.filters.attributeValues : null }, type: QueryTypes.SELECT });
                console.log("reponse", reponse);
                return resolver({ success: true, message: "Product list", data: reponse });
            } catch (error) {
                logger.info("ERROR", error)
                rejecter({ success: false, message: error });
            }
        })
    }

}
