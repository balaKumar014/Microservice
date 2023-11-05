import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from "../../helper/logger";
// import * as DotEnv from 'dotenv';
// DotEnv.config();
export default class Repository {
    public query: any;
    constructor() { }

    public mailAuthorization(payload: any): Promise<any[]> {
        return new Promise(async (resolver: any, rejecter: any) => {
            try {
                let data: object = { email: payload.email };
                let generateToken: string = jwt.sign(data, process.env.jwt || '', { expiresIn: '12h' });
                console.log("generateToken", generateToken)
                resolver({ success: true, token: generateToken })
            } catch (error) {
                logger.info("ERROR", error)
                rejecter({
                    success: false,
                    message: "Entered mail id is not valid"
                })
            }
        })
    }

}
