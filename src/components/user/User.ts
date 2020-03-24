import {IUser} from '@components/user/IUser';

export class User {
    private state: IUser;

    constructor() {
        this.state = {
            name: 'Kimtaehoon',
            isLogin: false
        };
    }

    public get isLogin(): boolean {
        return this.state.isLogin;
    }

    public get name(): string {
        return this.state.name;
    }

    public login(name: string) {
        this.state = {
            name,
            isLogin: true
        };
    }

    public logout() {
        this.state = {
            name: '',
            isLogin: false
        };
    }
}
