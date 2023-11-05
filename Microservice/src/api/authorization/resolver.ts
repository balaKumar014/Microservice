import loginRepository from './repository'
export default class Resolver {
    public loginRepository: any;

    constructor() {
        this.loginRepository = new loginRepository();
    }

    public mailAuthorization(data: any): Promise<any> {
        return this.loginRepository.mailAuthorization(data);
    }
}
