import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Logger from "./logger";
// const { S3Client } = require("@aws-sdk/client-s3");

export default class Utils {
    public static getUrl(request: any): string {
        const payload: any = JSON.stringify(request.payload);
        return `${request.url.pathname}--payload${payload}`;
    }

    public static validateToken(token: any): Promise<any>{
        return new Promise((resolver: any , rejecter: any) => {
            jwt.verify(token, process.env.jwt || "", (err: any, res: any) => {
                if(err){
                   return rejecter({success: false , message: "jwt token verfication failed"})
                }
                return resolver({ success: true, data: res });
            })
        })
    }
    public static generateRandomBigIntId(): Promise<any> {
        return new Promise(async (resolver: any, rejecter: any) => {
            try {
                // Generate an unsigned bigint
                const randomBytes = crypto.randomBytes(4);
                const unsignedBigint = BigInt('0x' + randomBytes.toString('hex'));
                let id = Number(unsignedBigint.toString());
                resolver(id);
            } catch (error) {
                Logger.error("ERROR", error)
            }
        })
    }
}