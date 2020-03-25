import {IStatus} from '@components/user/IStatus';

export class System {
    private token: number;
    private id: string = 'System';

    constructor() {
        this.id = 'SYSTEM';
        this.token = 0;
    }

    public update(status: IStatus) {
        if (status.isLogin) {
            this.token = [...status.name].reduce((acc, v) => {
                return acc + v.charCodeAt(0);
            }, 0);
            console.log(`[${this.id}]: ${status.name} 의 토큰은 ${this.token} 이야`);
        } else {
            console.log(`[${this.id}]: ${this.token}은 로그아웃 되었어`);
            this.token = 0;
        }
    }

}
