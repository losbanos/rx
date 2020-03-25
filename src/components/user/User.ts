import {IUser} from '@components/user/IUser';
import {BasicSubject} from '@components/subject/BasicSubject';

export class User extends BasicSubject {
    private state: IUser;

    constructor() {
        super();
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
        this.notify(this.state);
    }

    public logout() {
        this.state = {
            name: '',
            isLogin: false
        };
        this.notify(this.state);
    }
}
