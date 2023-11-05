import loginRepository from './repository'
export default class Resolver {
    public loginRepository: any;

    constructor() {
        this.loginRepository = new loginRepository();
    }

    public addProduct(token: string, data: any): Promise<any> {
        return this.loginRepository.addProduct(token, data);
    }
    public listProduct(token: string, data: any): Promise<any> {
        return this.loginRepository.listProduct(token, data);
    }
}