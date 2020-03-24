import {User} from '@components/user/User';

export class System {
    private user: User;
    private token: string = '';
    private id: string = 'System';

    constructor(user: User) {
        this.user = user;
    }

    public check() {
        const name: string = this.user.name;
        if (this.user.isLogin) {
            const token: number = [...name].reduce((acc, v) => {
                return acc + v.charCodeAt(0);
            }, 0);
            console.log(`[${this.id}]: ${name} 의 토큰은 ${token} 입니다.`);
        } else {
            this.token = '';
            console.log(`[${this.id}]: 로그인 되지 않았습니다.`);
        }
    }
}
